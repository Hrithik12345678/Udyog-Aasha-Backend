const mongoose = require("mongoose");
//schema
const productSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  }
});

module.exports = mongoose.model("products", productSchema);
