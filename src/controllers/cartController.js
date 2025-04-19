const { getCartService, addToCartService, updateCartItemService, removeFromCartService } = require('../services/cartService');
const getCart = async (req, res) => {
    try {
        const cart = await getCartService(req.user.id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const addToCart = async (req, res) => {
    try {
        const { productId, size, quantity } = req.body;
        const userId = req.user.id;

        const cart = await addToCartService(userId, productId, size, quantity);
        return res.status(200).json({
            message: 'Added to cart successfully',
            cart
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { itemId } = req.params;
        const userId = req.user.id;

        const cart = await updateCartItemService(userId, itemId, quantity);
        return res.status(200).json({
            message: 'Cart updated successfully',
            cart
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.user.id;

        const cart = await removeFromCartService(userId, itemId);
        return res.status(200).json({
            message: 'Item removed successfully',
            cart
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
}; 