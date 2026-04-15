import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Payment routes are public to allow guest checkout
// router.use(protect);

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

export default router;
