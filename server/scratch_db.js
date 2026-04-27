import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../../../server/.env') });

const orderSchema = new mongoose.Schema({}, { strict: false });
const Order = mongoose.model('Order', orderSchema);

async function checkOrders() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const newOrder = await Order.findOne({ razorpayOrderId: 'order_SiVWQmgoigt83m' });
    console.log('New Order (3500) Status:', newOrder ? newOrder.status : 'Not found');
    
    const oldOrder = await Order.findOne({ razorpayOrderId: 'order_SiUetmtXEW9SXo' });
    console.log('Old Order (1) Status:', oldOrder ? oldOrder.status : 'Not found');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

checkOrders();
