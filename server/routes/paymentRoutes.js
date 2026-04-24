import express from 'express';
import { createOrder, verifyPayment, getOrders, getOrderById, testBooking } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/order/:orderId', getOrderById);
router.post('/test-booking', testBooking);

// Admin routes
router.get('/orders', protect, getOrders);

export default router;
