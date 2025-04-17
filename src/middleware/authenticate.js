const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        // Kiểm tra header Authorization
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            console.log("Không tìm thấy header Authorization");
            return res.status(401).json({ 
                message: 'Không tìm thấy token xác thực',
                code: 'MISSING_TOKEN'
            });
        }

        // Tách token từ header
        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log("Token không hợp lệ trong header");
            return res.status(401).json({ 
                message: 'Token không hợp lệ',
                code: 'INVALID_TOKEN_FORMAT'
            });
        }

        // Xác thực token
        jwt.verify(token, process.env.NEXTAUTH_SECRET, (err, decoded) => {
            if (err) {
                console.log("Lỗi xác thực token:", err.message);
                
                // Phân loại lỗi
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ 
                        message: 'Token đã hết hạn',
                        code: 'TOKEN_EXPIRED'
                    });
                }
                
                if (err.name === 'JsonWebTokenError') {
                    return res.status(401).json({ 
                        message: 'Token không hợp lệ',
                        code: 'INVALID_TOKEN'
                    });
                }

                return res.status(401).json({ 
                    message: 'Lỗi xác thực',
                    code: 'AUTHENTICATION_ERROR'
                });
            }

            // Lưu thông tin người dùng vào request
            req.user = {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name
            };

            next();
        });
    } catch (error) {
        console.error("Lỗi không xác định trong middleware xác thực:", error);
        return res.status(500).json({ 
            message: 'Lỗi hệ thống',
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
};

module.exports = authenticate;
