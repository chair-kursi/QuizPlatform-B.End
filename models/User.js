const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("user", userSchema);