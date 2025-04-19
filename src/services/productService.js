const Product = require('../models/Product');

const getAllProductsService = async () => {
    try {
        return await Product.find().select('name price image category discount tags');
    } catch (error) {
        throw error;
    }
};

const getProductService = async (id) => {
    try {
        return await Product.findById(id);
    } catch (error) {
        throw error;
    }
};

const createProductService = async (productData) => {
    try {
        const product = new Product(productData);
        return await product.save();
    } catch (error) {
        throw error;
    }
};

const updateProductService = async (id, updateData) => {
    try {
        return await Product.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw error;
    }
};

const deleteProductService = async (id) => {
    try {
        return await Product.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
};

const searchProductService = async (name) => {
    try {
        return await Product.find({ 
            name: { $regex: name, $options: 'i' } 
        }).select('name price image category discount tags');
    } catch (error) {
        throw error;
    }
};

const getProductsByCategoryService = async (categoryId) => {
    try {
        return await Product.find({ category: categoryId })
            .select('name price image category discount tags');
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllProductsService,
    getProductService,
    createProductService,
    updateProductService,
    deleteProductService,
    searchProductService,
    getProductsByCategoryService
};
