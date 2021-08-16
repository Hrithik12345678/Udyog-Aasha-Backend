const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true],
        trim: true
    },
    age: {
        type: Number,
        required: true,

    },
    gender: {
        type: String,
        required: true,
    },
    mobileno: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        trim: true,
        unique: true,
    },
    password_repeat: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    token: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)