const express = require('express');
const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
// const auth = require('../middleware/auth');

const routerProduct = express.Router();

// Áp dụng middleware auth cho tất cả các route
// routerProduct.all("*", auth);

// Route cho product
routerProduct.get('/', getAllProducts);
routerProduct.get('/:id', getProduct);
routerProduct.post('/', createProduct);
routerProduct.put('/:id', updateProduct);
routerProduct.delete('/:id', deleteProduct);

module.exports = routerProduct;
