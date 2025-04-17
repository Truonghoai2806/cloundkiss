const { 
    getCartService, 
    addToCartService, 
    updateCartItemService, 
    removeFromCartService 
} = require('../services/cartService');

const getCart = async (req, res) => {
    try {
        console.log('User in getCart:', req.user);
        const cart = await getCartService(req.user.id);
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error in getCart:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng', error: error.message });
    }
}

const addToCart = async (req, res) => {
    try {
        console.log('User in addToCart:', req.user);
        const { productId, size, quantity = 1 } = req.body;
        
        if (!productId || !size) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        }

        const result = await addToCartService(req.user.id, productId, size, quantity);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result.cart);
    } catch (error) {
        console.error('Error in addToCart:', error);
        return res.status(500).json({ message: 'Lỗi khi thêm vào giỏ hàng', error: error.message });
    }
}

const updateCartItem = async (req, res) => {
    try {
        console.log('User in updateCartItem:', req.user);
        const { itemId } = req.params;
        const { quantity } = req.body;
        
        if (!quantity) {
            return res.status(400).json({ message: 'Thiếu số lượng' });
        }

        const result = await updateCartItemService(req.user.id, itemId, quantity);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result.cart);
    } catch (error) {
        console.error('Error in updateCartItem:', error);
        return res.status(500).json({ message: 'Lỗi khi cập nhật giỏ hàng', error: error.message });
    }
}

const removeFromCart = async (req, res) => {
    try {
        console.log('User in removeFromCart:', req.user);
        const { itemId } = req.params;
        
        const result = await removeFromCartService(req.user.id, itemId);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result.cart);
    } catch (error) {
        console.error('Error in removeFromCart:', error);
        return res.status(500).json({ message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng', error: error.message });
    }
}

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} 