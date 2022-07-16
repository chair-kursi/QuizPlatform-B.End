const mongoose = require("mongoose");

const quizTakerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quizId: {
        type: String, 
        required: true
    },
    quizResponse: {
        type: Array,
        required: true
    },
    started: {
        type: Date, 
        required: true
    },
    ended: {
        type: Date, 
        required: true
    }, 
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("quizTaker", quizTakerSchema);