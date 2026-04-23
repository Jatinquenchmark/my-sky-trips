import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import sendEmail from '../utils/sendEmail.js';
import { generateInvoiceHTML } from '../utils/invoiceTemplate.js';

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private (or Public depending on use case)
export const createOrder = async (req, res) => {
  try {
    const { amount, currency, notes, customerName, customerEmail, customerPhone, items } = req.body;

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
      amount: options.amount,
      currency: options.currency,
      status: 'created',
      notes: options.notes,
      items: items || [],
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

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify-payment
// @access  Private (or Public)
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

      // Send Invoice Email
      try {
        await sendEmail({
          email: order.customerEmail,
          subject: `Booking Confirmed! Invoice for Order ${order.razorpayOrderId}`,
          message: generateInvoiceHTML(order),
        });
      } catch (mailErr) {
        console.error('Failed to send invoice email:', mailErr);
        // We don't fail the request if email fails, but we log it
      }

      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully and invoice sent',
        data: order,
      });
    } else {
      // Update order status to failed if signature doesn't match
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
