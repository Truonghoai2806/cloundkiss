const express = require('express');
const { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
// const auth = require('../middleware/auth');

const routerCategory = express.Router();

// Áp dụng middleware auth cho tất cả các route
// routerCategory.all("*", auth);

// Route cho category
routerCategory.get('/', getAllCategories);
routerCategory.get('/:id', getCategory);
routerCategory.post('/', createCategory);
routerCategory.put('/:id', updateCategory);
routerCategory.delete('/:id', deleteCategory);

module.exports = routerCategory;
