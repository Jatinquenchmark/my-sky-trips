import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Activity from '../models/Activity.js';
import DailyActivityStats from '../models/DailyActivityStats.js';
import sendEmail from '../utils/sendEmail.js';
import { generateInvoiceHTML } from '../utils/invoiceTemplate.js';

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Public
export const createOrder = async (req, res) => {
  try {
    const { amount, currency, notes, customerName, customerEmail, customerPhone, customerAadhar, items, bookingDate } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, error: 'Amount is required' });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: notes || {},
    };

    const razorpayOrder = await instance.orders.create(options);

    if (!razorpayOrder) {
      return res.status(500).json({ success: false, error: 'Failed to create Razorpay order' });
    }

    // Save initial order in MongoDB
    const order = await Order.create({
      user: req.user ? req.user.id : null, 
      razorpayOrderId: razorpayOrder.id,
      customerName: customerName || (req.user ? req.user.name : 'Guest'),
      customerEmail: customerEmail || (req.user ? req.user.email : ''),
      customerPhone: customerPhone || '',
      customerAadhar: customerAadhar || '',
      amount: options.amount,
      currency: options.currency,
      status: 'created',
      notes: options.notes,
      items: items || [],
      bookingDate: bookingDate || null,
    });

    res.status(201).json({
      success: true,
      data: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });
  } catch (err) {
    console.error('Create Order Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Create Test Booking (No Payment)
// @route   POST /api/payment/test-booking
// @access  Public
export const testBooking = async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, customerAadhar, items, bookingDate, amount } = req.body;

    // Save order
    const order = await Order.create({
      razorpayOrderId: `test_${Date.now()}`,
      customerName,
      customerEmail,
      customerPhone,
      customerAadhar,
      amount: amount * 100,
      status: 'paid',
      items,
      bookingDate,
    });

    // Deduct seats for each item on the specific date
    if (items && items.length > 0 && bookingDate) {
      for (const item of items) {
        if (item.activityId) {
          await DailyActivityStats.findOneAndUpdate(
            { activityId: item.activityId, date: bookingDate },
            { $inc: { bookedSeats: item.persons || 1 } },
            { upsert: true, new: true }
          );
        }
      }
    }

    // Send Email notification (optional for test, but good for verification)
    try {
      // To Customer
      await sendEmail({
        email: customerEmail,
        subject: `[TEST] Booking Confirmed! Invoice for Order MST-TEST`,
        message: generateInvoiceHTML(order),
      });

      // To Admin (booking@myskytrips.com)
      await sendEmail({
        email: 'booking@myskytrips.com',
        subject: `[TEST] New Booking Alert: ${customerName}`,
        message: `
          <h3>New TEST Booking Received!</h3>
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Phone:</strong> ${customerPhone}</p>
          <p><strong>Date of Visit:</strong> ${new Date(bookingDate).toDateString()}</p>
          <p><strong>Total Amount:</strong> ₹${amount}</p>
          <hr/>
          <p>This is a test booking notification.</p>
        `,
      });
    } catch (mailErr) {
      console.error('Failed to send test emails:', mailErr);
    }

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error('Test Booking Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify-payment
// @access  Public
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Missing payment details' });
    }

    // Generate expected signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // Verify signature
    if (expectedSignature === razorpay_signature) {
      // Update order status in MongoDB
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: 'paid',
        },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found in database' });
      }

      // Send Invoice Email to Customer & Notification to Admin
      try {
        // 1. To Customer
        await sendEmail({
          email: order.customerEmail,
          subject: `Booking Confirmed! Invoice for Order ${order.razorpayOrderId}`,
          message: generateInvoiceHTML(order),
        });

        // 2. To Admin (booking@myskytrips.com)
        await sendEmail({
          email: 'booking@myskytrips.com',
          subject: `New Booking Alert: ${order.customerName} - ${order.items.length} Activities`,
          message: `
            <h3>New Booking Received!</h3>
            <p><strong>Customer:</strong> ${order.customerName}</p>
            <p><strong>Phone:</strong> ${order.customerPhone}</p>
            <p><strong>Date of Visit:</strong> ${order.bookingDate ? new Date(order.bookingDate).toDateString() : 'N/A'}</p>
            <p><strong>Total Amount Paid:</strong> ₹${order.amount / 100}</p>
            <hr/>
            <h4>Items Booked:</h4>
            <ul>
              ${order.items.map(item => `<li>${item.name} (${item.persons} Persons) - ${item.duration || 'Standard'}</li>`).join('')}
            </ul>
            <p>Check the admin dashboard for full details.</p>
          `,
        });
      } catch (mailErr) {
        console.error('Failed to send emails:', mailErr);
      }

      // Deduct seats for each item on the specific date
      if (order.items && order.items.length > 0 && order.bookingDate) {
        const bookingDateStr = order.bookingDate.toISOString().split('T')[0];
        for (const item of order.items) {
          if (item.activityId) {
            await DailyActivityStats.findOneAndUpdate(
              { activityId: item.activityId, date: bookingDateStr },
              { $inc: { bookedSeats: item.persons || 1 } },
              { upsert: true, new: true }
            );
          }
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully and seats reserved',
        data: order,
      });
    } else {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'failed' }
      );
      return res.status(400).json({ success: false, error: 'Invalid signature, payment verification failed' });
    }
  } catch (err) {
    console.error('Verify Payment Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get All Orders (Admin Only)
// @route   GET /api/payment/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error('Get Orders Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get Order By ID (Public for ticket download)
// @route   GET /api/payment/order/:orderId
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ razorpayOrderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    console.error('Get Order Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
