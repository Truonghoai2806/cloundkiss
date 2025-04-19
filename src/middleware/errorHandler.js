const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorResponse = {
        status: 'error',
        statusCode,
        message: err.message || 'Internal Server Error',
    };

    // Chỉ hiển thị stack trace trong môi trường development
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    // Log lỗi
    console.error(err);

    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler; 