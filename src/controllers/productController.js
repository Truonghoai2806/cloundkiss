const { getAllProductsService, getProductService, createProductService, updateProductService, deleteProductService, searchProductService } = require("../services/productService");

const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsService();
        if (!products) {
            return res.status(500).json({ message: 'Error getting products' });
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting products', error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await getProductService(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting product', error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, category, sizes, gender, discount, tags } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

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
            return res.status(500).json({ message: 'Error creating product' });
        }
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

const updateProduct = async (req, res) => {
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
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await deleteProductService(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
const searchProducts = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'Missing search keyword' });
        }

        const products = await searchProductService(name);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error searching products', error: error.message });
    }
};


module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};
