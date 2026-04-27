import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const activitySchema = new mongoose.Schema({}, { strict: false });
const Activity = mongoose.model('Activity', activitySchema);

async function cleanOrders() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    // Delete Test Ride activity
    const result = await Activity.deleteOne({ name: 'Test Ride' });
    console.log(`Deleted Test Ride Activity. Count: ${result.deletedCount}`);

    console.log(`Deleted ${result.deletedCount} test orders.`);
  } catch (err) {
    console.error('Error cleaning database:', err);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

cleanOrders();
