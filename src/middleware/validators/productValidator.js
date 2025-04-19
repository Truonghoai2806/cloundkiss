const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

const productValidation = {
    create: [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('description').trim().notEmpty().withMessage('Description is required'),
        body('image').trim().notEmpty().withMessage('Image is required'),
        body('category').isMongoId().withMessage('Invalid category ID'),
        body('sizes').isArray().withMessage('Sizes must be an array'),
        body('gender').isIn(['male', 'female', 'unisex']).withMessage('Invalid gender'),
        body('discount').optional().isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100'),
        body('tags').optional().isArray().withMessage('Tags must be an array')
    ],

    update: [
        param('id').isMongoId().withMessage('Invalid product ID'),
        body('name').optional().trim().notEmpty().withMessage('Name is required'),
        body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('description').optional().trim().notEmpty().withMessage('Description is required'),
        body('image').optional().trim().notEmpty().withMessage('Image is required'),
        body('category').optional().isMongoId().withMessage('Invalid category ID'),
        body('sizes').optional().isArray().withMessage('Sizes must be an array'),
        body('gender').optional().isIn(['male', 'female', 'unisex']).withMessage('Invalid gender'),
        body('discount').optional().isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100'),
        body('tags').optional().isArray().withMessage('Tags must be an array')
    ],

    getById: [
        param('id').isMongoId().withMessage('Invalid product ID')
    ],

    search: [
        query('name').trim().notEmpty().withMessage('Search name is required')
    ],

    getByCategory: [
        param('categoryId').isMongoId().withMessage('Invalid category ID')
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
};

module.exports = productValidation; 