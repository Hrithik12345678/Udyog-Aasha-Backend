const mongoose = require("mongoose");
//schema
const product_review = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter your email"],
    trim: true,
    unique: true,
  },
  reviews_array: {
    type: Array,
  }
});

module.exports = mongoose.model("product_reviews", product_review);
