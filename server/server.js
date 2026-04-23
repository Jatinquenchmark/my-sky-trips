import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();
// Server updated with Cloudinary credentials


// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate Limiting
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js';

// API Routes
import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/packages', apiLimiter, packageRoutes);
app.use('/api/payment', apiLimiter, paymentRoutes);
app.use('/api/water-activities', activityRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Sky-trip API' });
});


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
