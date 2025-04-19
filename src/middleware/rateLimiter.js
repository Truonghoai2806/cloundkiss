const rateLimit = require('express-rate-limit');

const createRateLimiter = (windowMs, max) => {
    return rateLimit({
        windowMs: windowMs, // Thời gian window (ms)
        max: max, // Số request tối đa trong window
        message: {
            status: 'error',
            statusCode: 429,
            message: 'Quá nhiều request, vui lòng thử lại sau'
        },
        standardHeaders: true, // Trả về rate limit info trong headers
        legacyHeaders: false, // Không sử dụng X-RateLimit-* headers
        skip: (req) => {
            // Bỏ qua rate limit cho một số route hoặc IP
            return false; // Thay đổi logic này nếu cần
        }
    });
};

// Tạo các rate limiter khác nhau cho các mục đích khác nhau
const apiLimiter = createRateLimiter(15 * 60 * 1000, 100); // 100 requests trong 15 phút
const authLimiter = createRateLimiter(60 * 60 * 1000, 5); // 5 requests trong 1 giờ cho auth

module.exports = {
    apiLimiter,
    authLimiter
}; 