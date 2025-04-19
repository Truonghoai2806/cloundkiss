const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    sizes: [{
        size: String,
        quantity: {
            type: Number,
            min: 0
        }
    }],
    gender: {
        type: String,
        enum: ['male', 'female', 'unisex'],
        default: 'unisex'
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

// Middleware để xử lý mảng rỗng và tính tổng số lượng
productSchema.pre('save', function (next) {
    // Nếu sizes là mảng rỗng, không lưu vào database
    if (this.sizes && this.sizes.length === 0) {
        this.sizes = undefined;
    }
    // Nếu tags là mảng rỗng, không lưu vào database
    if (this.tags && this.tags.length === 0) {
        this.tags = undefined;
    }
    next();
});

// Kiểm tra xem model đã tồn tại chưa trước khi tạo
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
