const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter your email"],
    trim: true,
    unique: true,
  },
  registration: {
    type: Array,
  },
  drive_link: {
    type: String,
  },
  unverified: {
    type: Number,
  },
});

module.exports = mongoose.model("services", serviceSchema);
