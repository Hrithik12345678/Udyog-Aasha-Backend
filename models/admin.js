const mongoose = require('mongoose')

// model Schema 
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("admins", adminSchema)  