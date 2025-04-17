const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { 
    getCart, 
    addToCart, 
    updateCartItem, 
    removeFromCart 
} = require('../controllers/cartController');

// Tất cả các route đều được bảo vệ bởi middleware authenticate
router.get('/', authenticate, getCart);
router.post('/', authenticate, addToCart);
router.put('/:itemId', authenticate, updateCartItem);
router.delete('/:itemId', authenticate, removeFromCart);

module.exports = router; 