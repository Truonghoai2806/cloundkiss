const Cart = require('../models/cart');
const Product = require('../models/product');

const getCartService = async (userId) => {
    try {
        return await Cart.findOne({ user: userId }).populate('items.product');
    } catch (error) {
        console.log("Error getting cart:", error);
        return null;
    }
}

const addToCartService = async (userId, productId, size, quantity = 1) => {
    try {
        // Kiểm tra sản phẩm có tồn tại không
        const product = await Product.findById(productId);
        if (!product) {
            return { success: false, message: 'Sản phẩm không tồn tại' };
        }

        // Tìm giỏ hàng của user
        let cart = await Cart.findOne({ user: userId });
        
        // Nếu chưa có giỏ hàng, tạo mới
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: []
            });
        }

        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        const existingItem = cart.items.find(item => 
            item.product.toString() === productId && item.size === size
        );

        if (existingItem) {
            // Nếu đã có, cập nhật số lượng
            existingItem.quantity = quantity;
        } else {
            // Nếu chưa có, thêm mới
            cart.items.push({
                product: productId,
                size,
                quantity
            });
        }

        await cart.save();
        return { success: true, cart };
    } catch (error) {
        console.log("Error adding to cart:", error);
        return { success: false, message: 'Lỗi khi thêm vào giỏ hàng' };
    }
}

const updateCartItemService = async (userId, itemId, quantity) => {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return { success: false, message: 'Giỏ hàng không tồn tại' };
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return { success: false, message: 'Sản phẩm không tồn tại trong giỏ hàng' };
        }

        item.quantity = quantity;
        await cart.save();
        return { success: true, cart };
    } catch (error) {
        console.log("Error updating cart item:", error);
        return { success: false, message: 'Lỗi khi cập nhật giỏ hàng' };
    }
}

const removeFromCartService = async (userId, itemId) => {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return { success: false, message: 'Giỏ hàng không tồn tại' };
        }

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();
        return { success: true, cart };
    } catch (error) {
        console.log("Error removing from cart:", error);
        return { success: false, message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng' };
    }
}

module.exports = {
    getCartService,
    addToCartService,
    updateCartItemService,
    removeFromCartService
} 