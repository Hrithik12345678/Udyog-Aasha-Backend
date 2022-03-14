const mongoose = require('mongoose');

const getCart = new mongoose.Schema({
    user_id:{
        type: String,
        require: true,
    },
    product_array: {
        type: Array,
        require: true,
    }
});

module.exports = mongoose.model("cart", getCart);