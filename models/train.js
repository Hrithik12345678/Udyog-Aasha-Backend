const mongoose = require("mongoose");
//schema
const trainSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Mode: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
  details:{
    type: Array,
  },
  discription: {
    type: String,
  },
  invigilator:{
    typr: String,
  },
});

module.exports = mongoose.model("aliens", trainSchema);
