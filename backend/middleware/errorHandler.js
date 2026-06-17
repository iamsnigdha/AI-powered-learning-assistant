

const errorHandler = (err, reg, res, next) => {
    let statusCode = err.errstatusCode || 500;
    let message = err.message || 'Server Error';

    //Mongoose bad ObjectId
    if (err.name === "CastError") {
        message = 'Resource not found';
        statusCode =404;

    }
    //Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
        statusCode = 400;
        
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
        message = 'File size exceeds the maximum limit of 10MB'
        statusCode = 400;
    }
    // JWT errors
    if (err.name === 'TokenExpiredError') {
        message = 'Token expired'
        statusCode = 401; 
    }

    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
    res.status(statusCode).json({
        success: false,
        error:message,
        statusCode,
        ...(process.env.NODE_ENV == 'development' && {stack: err.stack})

    });
};

// ... your existing code ...

export default errorHandler;  // ADD THIS LINE