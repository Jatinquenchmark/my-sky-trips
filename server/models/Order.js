import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Optional if we allow guest payments or manual tracking
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: false,
    },
    customerEmail: {
      type: String,
      required: false,
    },
    customerPhone: {
      type: String,
      required: false,
    },
    customerAadhar: {
      type: String,
      required: false,
    },
    razorpayPaymentId: {
      type: String,
      required: false,
    },
    razorpaySignature: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],
      default: 'created',
    },
    notes: {
      type: Map,
      of: String,
    },
    items: [
      {
        name: String,
        emoji: String,
        persons: Number,
        totalPrice: Number,
        duration: String,
      }
    ],
    bookingDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
