import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const orderSchema = new mongoose.Schema({}, { strict: false });
const Order = mongoose.model('Order', orderSchema);

async function cleanOrders() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    // Delete ALL orders as requested
    const result = await Order.deleteMany({});

    console.log(`Deleted ${result.deletedCount} test orders.`);
  } catch (err) {
    console.error('Error cleaning database:', err);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

cleanOrders();
