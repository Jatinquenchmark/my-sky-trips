import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from the root server folder
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
    try {
        // Connect to DB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        const email = 'admin@skytrip.com';
        const password = 'admin123'; // Aap ise baad mein change kar sakte hain

        // Check if admin already exists
        const adminExists = await User.findOne({ email });

        if (adminExists) {
            console.log('Admin already exists!');
            process.exit();
        }

        // Create Admin
        await User.create({
            name: 'Main Admin',
            email: email,
            password: password,
            role: 'admin'
        });

        console.log('******************************************');
        console.log('Admin Created Successfully!');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('******************************************');

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
