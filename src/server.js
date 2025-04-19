require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const authenticate = require("./middleware/authenticate"); // Middleware xác thực token
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 8080;

// Cấu hình CORS trước tất cả các middleware khác
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true // Cho phép gửi cookie
}));

// Security headers
app.use(helmet());

// Compression
app.use(compression());

// Rate limiting
app.use('/api/', apiLimiter);
app.use('/api/auth/', authLimiter);

// Middleware cấu hình
app.use(express.json()); // Xử lý JSON body
app.use(express.urlencoded({ extended: true })); // Xử lý form data

// Logging middleware
app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`);
    next();
});

// Cấu hình route bảo vệ API
app.get("/api/protected", authenticate, (req, res) => {
    res.json({
        message: "Protected API accessed successfully",
        user: req.user,
    });
});

// Cấu hình view engine
configViewEngine(app);

// Khai báo route
app.use('/category', categoryRoutes); 
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);

// Error handling
app.use(errorHandler);

// Khởi động server
(async () => {
    try {
        // Kết nối DB (nếu dùng mongoose)
        await connection();

        app.listen(port, () => {
            logger.info(`Backend Nodejs App listening on port ${port}`);
        });
    } catch (error) {
        logger.error(`Error connect to DB: ${error.message}`);
        process.exit(1);
    }
})();
