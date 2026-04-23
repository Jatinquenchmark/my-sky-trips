import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import path from 'path';

dotenv.config();

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: 'suryapratap45@gmail.com' });
        if (user) {
            console.log('User found:', user.email);
        } else {
            console.log('User not found');
            const allUsers = await User.find({}, 'email');
            console.log('Existing users:', allUsers.map(u => u.email));
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUser();
