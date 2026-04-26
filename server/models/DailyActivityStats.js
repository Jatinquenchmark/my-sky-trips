import mongoose from 'mongoose';

const dailyActivityStatsSchema = new mongoose.Schema(
  {
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity',
      required: true,
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true,
    },
    bookedSeats: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Unique index to prevent duplicate records for the same activity and date
dailyActivityStatsSchema.index({ activityId: 1, date: 1 }, { unique: true });

export default mongoose.model('DailyActivityStats', dailyActivityStatsSchema);
