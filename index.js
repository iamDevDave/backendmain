import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogPostRoutes from './routes/blogPostRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './utils/errorHandler.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Use the CORS_ORIGIN environment variable
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and authorization headers
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogposts', blogPostRoutes);

// Global error handler
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
