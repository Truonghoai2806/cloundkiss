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
            // Nếu đã có, cộng dồn số lượng
            existingItem.quantity += quantity;
        } else {
            // Nếu chưa có, thêm mới
            cart.items.push({
                product: productId,
                size,
                quantity
            });
        }

        // Tính tổng tiền giỏ hàng
        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            if (product) {
                total += item.quantity * product.price;
            }
        }
        cart.total = total;

        await cart.save();
        return { success: true, cart };
    } catch (error) {
        console.log("Error adding to cart:", error);
        return { success: false, message: 'Lỗi khi thêm vào giỏ hàng' };
    }
}

const updateCartItemService = async (userId, itemId, quantity) => {
    try {
        // Kiểm tra số lượng hợp lệ
        if (quantity < 1) {
            return { success: false, message: 'Số lượng phải lớn hơn 0' };
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            console.error('Cart not found for user:', userId);
            return { success: false, message: 'Giỏ hàng không tồn tại' };
        }

        // Tìm sản phẩm trong giỏ hàng bằng cách so sánh _id
        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            console.error('Item not found in cart:', itemId);
            return { success: false, message: 'Sản phẩm không tồn tại trong giỏ hàng' };
        }

        // Cập nhật số lượng
        item.quantity = quantity;

        // Tính tổng tiền giỏ hàng
        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            if (product) {
                total += item.quantity * product.price;
            }
        }
        cart.total = total;

        await cart.save();
        return { success: true, cart };
    } catch (error) {
        console.error('Error updating cart item:', error);
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

        // Tính tổng tiền giỏ hàng
        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            if (product) {
                total += item.quantity * product.price;
            }
        }
        cart.total = total;

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