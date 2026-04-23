import mongoose from 'mongoose';

const durationPricingSchema = new mongoose.Schema({
  label: { type: String, required: true },  // e.g. "30 Min", "1 Hour"
  price: { type: Number, required: true },
}, { _id: false });

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an activity name'],
      trim: true,
    },
    emoji: {
      type: String,
      default: '🌊',
    },
    image: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: 'Experience the ultimate water adventure in Tehri Lake.',
    },
    // For single-price activities: price is set directly
    // For multi-duration: price is 0 and durations array is used
    price: {
      type: Number,
      default: 0,
    },
    durations: [durationPricingSchema],  // If activity has multiple duration options
    totalSeats: {
      type: Number,
      default: 50,
    },
    bookedSeats: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Virtual: available seats
activitySchema.virtual('availableSeats').get(function () {
  return this.totalSeats - this.bookedSeats;
});

// Virtual: is full
activitySchema.virtual('isFull').get(function () {
  return this.bookedSeats >= this.totalSeats;
});

activitySchema.set('toJSON', { virtuals: true });
activitySchema.set('toObject', { virtuals: true });

export default mongoose.model('Activity', activitySchema);
