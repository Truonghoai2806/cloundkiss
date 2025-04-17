const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        // Lấy token từ header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Không tìm thấy token' });
        }

        // Xác thực token sử dụng cùng NEXTAUTH_SECRET với FE
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        
        // Gắn thông tin user vào request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name
        };

        next();
    } catch (error) {
        console.error('Lỗi xác thực:', error);
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
}

module.exports = authenticate;
