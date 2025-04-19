const winston = require('winston');
const path = require('path');

// Định nghĩa các log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Chọn level dựa trên môi trường
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

// Định nghĩa màu sắc cho mỗi level
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

// Thêm màu sắc cho winston
winston.addColors(colors);

// Định dạng log
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

// Định nghĩa transports
const transports = [
    // Console transport
    new winston.transports.Console(),
    // Error log file
    new winston.transports.File({
        filename: path.join(__dirname, '../../logs/error.log'),
        level: 'error',
    }),
    // Tất cả logs
    new winston.transports.File({ 
        filename: path.join(__dirname, '../../logs/all.log') 
    }),
];

// Tạo logger instance
const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

module.exports = logger; 