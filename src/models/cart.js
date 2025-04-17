const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  size: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Middleware để tính tổng tiền giỏ hàng
cartSchema.pre('save', function(next) {
  let total = 0;
  this.items.forEach(item => {
    total += item.quantity * item.product.price;
  });
  this.total = total;
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart; 