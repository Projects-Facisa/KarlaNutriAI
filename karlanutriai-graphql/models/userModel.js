const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model("User", userSchema);