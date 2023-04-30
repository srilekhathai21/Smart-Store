const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StoreCustomer',
        required: true
    },
    productDetails: {
        type: [],
        required: true
    }


});

module.exports = mongoose.model('CartDetails', CartSchema);