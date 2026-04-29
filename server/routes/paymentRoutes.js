import express from 'express';
import { createOrder, verifyPayment, getOrders, getOrdersByDate, getOrderById, testBooking, razorpayWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/order/:orderId', getOrderById);
router.post('/test-booking', testBooking);
router.post('/webhook', razorpayWebhook);

// Admin routes
router.get('/orders', protect, getOrders);
router.get('/orders-by-date', protect, getOrdersByDate);

export default router;
