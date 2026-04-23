import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a package title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    locations: {
      type: String,
      required: [true, 'Please add locations'],
    },
    duration: {
      type: String,
      required: [true, 'Please add duration (e.g., 5 Days / 4 Nights)'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    image: {
      type: String,
      default: 'no-photo.jpg',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    showPrice: {
      type: Boolean,
      default: false,
    },
    groupSize: {
      type: Number,
      default: 6,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    itinerary: [
      {
        day: { type: String, required: true },
        title: { type: String, required: true },
        activities: { type: String, required: true }
      }
    ],
    inclusions: [String],
    exclusions: [String],
    gallery: [String],
    pricingTiers: [
      {
        tier: { type: String, required: true },
        price: { type: Number, required: true },
        features: [String]
      }
    ],
    pricingStructure: [String],
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Package', packageSchema);
