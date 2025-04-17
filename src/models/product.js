const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: null
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    sizes: [{
        size: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        }
    }],
    gender: {
        type: String,
        enum: ['nam', 'nu', 'unisex'],
        default: 'unisex'
    },
    discount: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String,
        enum: ['featured', 'new']
    }]
}, {
    timestamps: true
});

// Middleware để xử lý mảng rỗng
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
