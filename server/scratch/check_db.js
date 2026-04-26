import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const activitySchema = new mongoose.Schema({ name: String }, { strict: false });
const Activity = mongoose.model('Activity', activitySchema);

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sky-trip');
    console.log('Connected to DB');
    const count = await Activity.countDocuments();
    console.log('Activity Count:', count);
    const activities = await Activity.find().limit(5);
    console.log('Activities Sample:', JSON.stringify(activities, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
