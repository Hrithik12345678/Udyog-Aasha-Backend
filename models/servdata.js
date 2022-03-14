const mongoose = require("mongoose");


const servicedataSchema = new mongoose.Schema({
    service_name: {
        type: String,
    },
    service_array: {
        type: Array,
    },
  });
  
  module.exports = mongoose.model("servdatas", servicedataSchema);