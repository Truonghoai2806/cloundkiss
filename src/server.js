require('dotenv').config();
const express = require('express');
const cors = require('cors');

const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const apiRoutes = require('./routes/api');
const { getHomepage } = require('./controllers/homeController');

const app = express();
const port = process.env.PORT || 3000;

// Middleware cấu hình
app.use(cors());
app.use(express.json()); // Xử lý JSON body
app.use(express.urlencoded({ extended: true })); // Xử lý form data

// Cấu hình view engine
configViewEngine(app);

// Khai báo route
app.use('/api', apiRoutes);
app.use('/', getHomepage);

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
