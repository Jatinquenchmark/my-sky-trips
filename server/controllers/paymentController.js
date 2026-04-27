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
    const { currency, notes, customerName, customerEmail, customerPhone, customerAadhar, items, bookingDate } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Items are required for booking' });
    }

    let calculatedTotalAmount = 0;

    // Securely calculate total amount from DB
    for (const item of items) {
      const activity = await Activity.findById(item.activityId);
      if (!activity) {
        return res.status(404).json({ success: false, error: `Activity not found for ID: ${item.activityId}` });
      }

      let itemPrice = 0;
      if (item.duration && activity.durations && activity.durations.length > 0) {
        // Find specific duration price
        const durationOption = activity.durations.find(d => d.label === item.duration);
        if (durationOption) {
          itemPrice = durationOption.price;
        } else {
          return res.status(400).json({ success: false, error: `Invalid duration '${item.duration}' for activity ${activity.name}` });
        }
      } else {
        // Standard price
        itemPrice = activity.price;
      }

      calculatedTotalAmount += itemPrice * (item.persons || 1);
    }

    if (calculatedTotalAmount <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid total amount calculated' });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(calculatedTotalAmount * 100), // Convert to paise securely
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
    const { customerName, customerEmail, customerPhone, customerAadhar, items, bookingDate } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Items are required for booking' });
    }

    let calculatedTotalAmount = 0;

    // Securely calculate total amount from DB
    for (const item of items) {
      const activity = await Activity.findById(item.activityId);
      if (activity) {
        let itemPrice = 0;
        if (item.duration && activity.durations && activity.durations.length > 0) {
          const durationOption = activity.durations.find(d => d.label === item.duration);
          if (durationOption) itemPrice = durationOption.price;
        } else {
          itemPrice = activity.price;
        }
        calculatedTotalAmount += itemPrice * (item.persons || 1);
      }
    }

    // Save order
    const order = await Order.create({
      razorpayOrderId: `test_${Date.now()}`,
      customerName,
      customerEmail,
      customerPhone,
      customerAadhar,
      amount: calculatedTotalAmount * 100, // Now secure
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

// @desc    Razorpay Webhook for Payment Status
// @route   POST /api/payment/webhook
// @access  Public
export const razorpayWebhook = async (req, res) => {
  try {
    // Webhook secret from your .env
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    // Razorpay signature from headers
    const signature = req.headers['x-razorpay-signature'];
    
    // Webhook payload body
    const body = req.body;
    
    if (!secret || !signature) {
      return res.status(400).send('Missing secret or signature');
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error('Webhook signature verification failed');
      return res.status(400).send('Invalid Signature');
    }

    // Process the event
    const event = body.event;
    
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = body.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;
      
      // Find the order
      const order = await Order.findOne({ razorpayOrderId: orderId });
      
      if (!order) {
        console.error(`Webhook: Order not found for Razorpay Order ID: ${orderId}`);
        return res.status(404).send('Order not found');
      }

      // Check if already paid (maybe frontend already verified it)
      if (order.status === 'paid') {
        console.log(`Webhook: Order ${orderId} already marked as paid.`);
        return res.status(200).send('Already processed');
      }

      // Update order to paid
      const updatedOrder = await Order.findOneAndUpdate(
        { razorpayOrderId: orderId },
        {
          razorpayPaymentId: paymentId,
          status: 'paid',
        },
        { new: true }
      );

      // Send Invoice Email to Customer & Notification to Admin
      try {
        await sendEmail({
          email: updatedOrder.customerEmail,
          subject: `Booking Confirmed! Invoice for Order ${updatedOrder.razorpayOrderId}`,
          message: generateInvoiceHTML(updatedOrder),
        });

        await sendEmail({
          email: 'booking@myskytrips.com',
          subject: `New Booking Alert (Webhook): ${updatedOrder.customerName} - ${updatedOrder.items.length} Activities`,
          message: `
            <h3>New Booking Received via Webhook!</h3>
            <p><strong>Customer:</strong> ${updatedOrder.customerName}</p>
            <p><strong>Phone:</strong> ${updatedOrder.customerPhone}</p>
            <p><strong>Date of Visit:</strong> ${updatedOrder.bookingDate ? new Date(updatedOrder.bookingDate).toDateString() : 'N/A'}</p>
            <p><strong>Total Amount Paid:</strong> ₹${updatedOrder.amount / 100}</p>
            <hr/>
            <h4>Items Booked:</h4>
            <ul>
              ${updatedOrder.items.map(item => `<li>${item.name} (${item.persons} Persons) - ${item.duration || 'Standard'}</li>`).join('')}
            </ul>
          `,
        });
      } catch (mailErr) {
        console.error('Webhook: Failed to send emails:', mailErr);
      }

      // Deduct seats
      if (updatedOrder.items && updatedOrder.items.length > 0 && updatedOrder.bookingDate) {
        const bookingDateStr = updatedOrder.bookingDate.toISOString().split('T')[0];
        for (const item of updatedOrder.items) {
          if (item.activityId) {
            await DailyActivityStats.findOneAndUpdate(
              { activityId: item.activityId, date: bookingDateStr },
              { $inc: { bookedSeats: item.persons || 1 } },
              { upsert: true, new: true }
            );
          }
        }
      }

      console.log(`Webhook: Successfully processed payment for order ${orderId}`);
    }

    // Return 200 OK so Razorpay knows we received the webhook
    res.status(200).send('OK');
  } catch (err) {
    console.error('Webhook Error:', err);
    res.status(500).send('Internal Server Error');
  }
};
