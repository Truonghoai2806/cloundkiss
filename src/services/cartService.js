const Cart = require('../models/cart');
const Product = require('../models/product');

const getCartService = async (userId) => {
    try {
        return await Cart.findOne({ user: userId }).populate('items.product');
    } catch (error) {
        throw error;
    }
}

const addToCartService = async (userId, productId, size, quantity = 1) => {
    try {
        // Kiểm tra sản phẩm có tồn tại không
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Kiểm tra số lượng tồn kho
        const sizeObj = product.sizes.find(s => s.size === size);
        if (!sizeObj) {
            throw new Error('Invalid size');
        }
        if (sizeObj.quantity < quantity) {
            throw new Error('Insufficient stock');
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
            // Kiểm tra tổng số lượng sau khi cộng dồn
            const newQuantity = existingItem.quantity + quantity;
            if (sizeObj.quantity < newQuantity) {
                throw new Error('Insufficient stock');
            }
            existingItem.quantity = newQuantity;
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
        return cart;
    } catch (error) {
        throw error;
    }
}

const updateCartItemService = async (userId, itemId, quantity) => {
    try {
        // Kiểm tra số lượng hợp lệ
        if (quantity < 1) {
            throw new Error('Quantity must be greater than 0');
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        // Tìm sản phẩm trong giỏ hàng
        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            throw new Error('Item not found in cart');
        }

        // Kiểm tra số lượng tồn kho
        const product = await Product.findById(item.product);
        const sizeObj = product.sizes.find(s => s.size === item.size);
        if (!sizeObj) {
            throw new Error('Invalid size');
        }
        if (sizeObj.quantity < quantity) {
            throw new Error('Insufficient stock');
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
        return cart;
    } catch (error) {
        throw error;
    }
}

const removeFromCartService = async (userId, itemId) => {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        
        // Tính lại tổng tiền
        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            if (product) {
                total += item.quantity * product.price;
            }
        }
        cart.total = total;

        await cart.save();
        return cart;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCartService,
    addToCartService,
    updateCartItemService,
    removeFromCartService
}; 