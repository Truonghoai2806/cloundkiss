const Product = require("../models/Product");

const getAllProductsService = async () => {
    try {
        return await Product.find().populate('category').sort({ createdAt: -1 });
    } catch (error) {
        console.log("Error getting products:", error);
        return null;
    }
}

const getProductService = async (id) => {
    try {
        const product = await Product.findById(id).populate('category');
        return product || null;
    } catch (error) {
        console.log("Error getting product:", error);
        return null;
    }
}

const createProductService = async (data) => {
    try {
        return await Product.create(data);
    } catch (error) {
        console.log("Error creating product:", error);
        return null;
    }
}

const updateProductService = async (id, data) => {
    try {
        return await Product.findByIdAndUpdate(id, data, { new: true }).populate('category');
    } catch (error) {
        console.log("Error updating product:", error);
        return null;
    }
}

const deleteProductService = async (id) => {
    try {
        return await Product.findByIdAndDelete(id);
    } catch (error) {
        console.log("Error deleting product:", error);
        return null;
    }
}

module.exports = {
    getAllProductsService,
    getProductService,
    createProductService,
    updateProductService,
    deleteProductService
}
