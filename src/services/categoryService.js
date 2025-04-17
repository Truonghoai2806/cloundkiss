const Category = require('../models/category');

const getAllCategoriesService = async () => {
    try {
        let result = await Category.find().sort({ createdAt: -1 });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getCategoryService = async (id) => {
    try {
        let result = await Category.findById(id);
        if (!result) {
            return null;
        }
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createCategoryService = async (name) => {
    try {
        let result = await Category.create({ name });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateCategoryService = async (id, name) => {
    try {
        let result = await Category.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        if (!result) {
            return null;
        }
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteCategoryService = async (id) => {
    try {
        let result = await Category.findByIdAndDelete(id);
        if (!result) {
            return null;
        }
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getAllCategoriesService, getCategoryService, createCategoryService, updateCategoryService, deleteCategoryService }
