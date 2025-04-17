require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authenticate = require("./middleware/authenticate"); // Middleware xác thực token
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const Routes = require('./routes/api');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
// const { getHomepage } = require('./controllers/homeController');

const app = express();
const port = process.env.PORT || 8080;

// Cấu hình CORS trước tất cả các middleware khác
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
}));

// Middleware cấu hình
app.use(express.json()); // Xử lý JSON body
app.use(express.urlencoded({ extended: true })); // Xử lý form data

// Cấu hình route bảo vệ API
app.get("/api/protected", authenticate, (req, res) => {
    res.json({
        message: "Bạn đã truy cập API bảo mật thành công!",
        user: req.user,
    });
});

// Cấu hình view engine
configViewEngine(app);

// Khai báo route
// app.use('/', getHomepage);
app.use('/api', Routes);
app.use('/category', categoryRoutes); 
app.use('/product', productRoutes);
// Khởi động server
(async () => {
    try {
        // Kết nối DB (nếu dùng mongoose)
        await connection();

        app.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`);
        });
    } catch (error) {
        console.log(">>> Error connect to DB: ", error);
    }
})();
