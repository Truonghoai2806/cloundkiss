const { getAllProductsService, getProductService, createProductService, updateProductService, deleteProductService, searchProductService, getProductsByCategoryService } = require("../services/productService");
const productValidation = require('../middleware/validators/productValidator');

const getAllProducts = async (req, res, next) => {
    try {
        const products = await getAllProductsService();
        if (!products) {
            throw new Error('Error getting products');
        }
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const product = await getProductService(req.params.id);
        if (!product) {
            throw new Error('Product not found');
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const { name, price, description, image, category, sizes, gender, discount, tags } = req.body;

        const productData = {
            name,
            price,
            description,
            image,
            category,
            sizes: Array.isArray(sizes) ? sizes : [],
            gender,
            discount,
            tags: Array.isArray(tags) ? tags : []
        };

        const product = await createProductService(productData);
        if (!product) {
            throw new Error('Error creating product');
        }
        
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { name, price, description, image, category, sizes, gender, discount, tags } = req.body;

        const updateData = {
            name,
            price,
            description,
            image,
            category,
            sizes: Array.isArray(sizes) ? sizes : [],
            gender,
            discount,
            tags: Array.isArray(tags) ? tags : []
        };

        const product = await updateProductService(req.params.id, updateData);
        if (!product) {
            throw new Error('Product not found');
        }
        
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const product = await deleteProductService(req.params.id);
        if (!product) {
            throw new Error('Product not found');
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const searchProducts = async (req, res, next) => {
    try {
        const products = await searchProductService(req.query.name);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

const getProductsByCategory = async (req, res, next) => {
    try {
        const products = await getProductsByCategoryService(req.params.categoryId);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts: [productValidation.validate, getAllProducts],
    getProduct: [productValidation.getById, productValidation.validate, getProduct],
    createProduct: [productValidation.create, productValidation.validate, createProduct],
    updateProduct: [productValidation.update, productValidation.validate, updateProduct],
    deleteProduct: [productValidation.getById, productValidation.validate, deleteProduct],
    searchProducts: [productValidation.search, productValidation.validate, searchProducts],
    getProductsByCategory: [productValidation.getByCategory, productValidation.validate, getProductsByCategory]
};
