import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';          // FIX: was 'connerDB'
import errorHandler from './middleware/errorHandler.js';
import authRouts from './routes/authRoutes.js'


// ES6 module __dirname alternative 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();                                       // FIX: was calling wrong name

// Middleware to handle CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],  // FIX: was "Content~Type"
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));   // FIX: was 'extrnded'

// Static folder for uploads 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
// TODO: add your route files here e.g. app.use('/api/users', userRoutes)

app.use('/api/auth', authRouts)
// Error handler (must be LAST)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false, 
        error: 'Route not found',
        statusCode: 404
    });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);  // FIX: backticks
});

process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);   // FIX: backticks
    process.exit(1);
});