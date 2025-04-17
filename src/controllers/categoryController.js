const { getAllCategoriesService, getCategoryService, createCategoryService, updateCategoryService, deleteCategoryService } = require("../services/categoryService");

// Get all categories
const getAllCategories = async (req, res) => {
    const data = await getAllCategoriesService();
    if (!data) {
        return res.status(500).json({ message: 'Error getting categories' });
    }
    return res.status(200).json(data);
};

// Get single category
const getCategory = async (req, res) => {
    const data = await getCategoryService(req.params.id);
    if (!data) {
        return res.status(404).json({ message: 'Category not found' });
    }
    return res.status(200).json(data);
};

// Create category
const createCategory = async (req, res) => {
    const { name } = req.body;
    const data = await createCategoryService(name);
    if (!data) {
        return res.status(500).json({ message: 'Error creating category' });
    }
    return res.status(201).json(data);
};

// Update category
const updateCategory = async (req, res) => {
    const { name } = req.body;
    const data = await updateCategoryService(req.params.id, name);
    if (!data) {
        return res.status(404).json({ message: 'Category not found' });
    }
    return res.status(200).json(data);
};

// Delete category
const deleteCategory = async (req, res) => {
    const data = await deleteCategoryService(req.params.id);
    if (!data) {
        return res.status(404).json({ message: 'Category not found' });
    }
    return res.status(200).json({ message: 'Category deleted successfully' });
};

module.exports = {
    getAllCategories, getCategory, createCategory, updateCategory, deleteCategory
};
