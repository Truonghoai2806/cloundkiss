require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const white_lists = ["/login", "/register"];
    if (white_lists.find(item => '/api' + item === req.originalUrl)) {
        next();
    } else {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = {
                    email: decoded.email,
                    name: decoded.name,
                    role: decoded.role
                }
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "Token is invalid"
                })
            }

        } else {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
    }

}
module.exports = auth;