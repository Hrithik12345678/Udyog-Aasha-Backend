const mongoose = require("mongoose");
//schema
const reviewSchema = new mongoose.Schema({
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

module.exports = mongoose.model("reviews", reviewSchema);
