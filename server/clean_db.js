import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const activitySchema = new mongoose.Schema({}, { strict: false });
const Activity = mongoose.model('Activity', activitySchema);
const orderSchema = new mongoose.Schema({}, { strict: false });
const Order = mongoose.model('Order', orderSchema);
const dailyStatsSchema = new mongoose.Schema({}, { strict: false });
const DailyActivityStats = mongoose.model('DailyActivityStats', dailyStatsSchema);

async function cleanOrders() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    // Delete Test Ride activity
    const result = await Activity.deleteOne({ name: 'Test Ride' });
    console.log(`Deleted Test Ride Activity. Count: ${result.deletedCount}`);

    const result2 = await Order.deleteMany({});
    console.log(`Deleted Orders. Count: ${result2.deletedCount}`);

    const result3 = await DailyActivityStats.deleteMany({});
    console.log(`Deleted DailyActivityStats (reset quotas). Count: ${result3.deletedCount}`);

  } catch (err) {
    console.error('Error cleaning database:', err);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

cleanOrders();
