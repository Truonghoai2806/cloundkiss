const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');

const cartValidation = {
    add: [
        body('productId')
            .notEmpty()
            .withMessage('ID sản phẩm là bắt buộc')
            .isMongoId()
            .withMessage('ID sản phẩm không hợp lệ'),
        body('size')
            .notEmpty()
            .withMessage('Size là bắt buộc')
            .isString()
            .withMessage('Size phải là chuỗi'),
        body('quantity')
            .notEmpty()
            .withMessage('Số lượng là bắt buộc')
            .isInt({ min: 1 })
            .withMessage('Số lượng phải là số nguyên dương')
    ],

    update: [
        param('itemId')
            .notEmpty()
            .withMessage('ID sản phẩm trong giỏ hàng là bắt buộc')
            .isMongoId()
            .withMessage('ID sản phẩm trong giỏ hàng không hợp lệ'),
        body('quantity')
            .notEmpty()
            .withMessage('Số lượng là bắt buộc')
            .isInt({ min: 1 })
            .withMessage('Số lượng phải là số nguyên dương')
    ],

    remove: [
        param('itemId')
            .notEmpty()
            .withMessage('ID sản phẩm trong giỏ hàng là bắt buộc')
            .isMongoId()
            .withMessage('ID sản phẩm trong giỏ hàng không hợp lệ')
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors.array()
            });
        }
        next();
    }
};

module.exports = cartValidation; 