const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    pk_id: {
        type: String,
        required: true,
        trim: true
    },
    deliveryMethod: {
        type: String,
        enum: ["POC", "PAYSTACK"],
        trim: true
    },
    status: {
        type: String,
        enum: ["NEW", "COMPLETED", ],
        trim: true
    },
    products: {},
    isDeleted: {
        type: Boolean,
        trim: true,
        required: true,
        default: false,
    }

},
    {
        timestamps: true,
    });


module.exports = mongoose.model('Order', OrderSchema)