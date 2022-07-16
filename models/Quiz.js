var mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        default: [],
    },
    score: {
        type: Number,
    },
    answer: {
        type: Number,//option number
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

const timeSchema = mongoose.Schema({
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

const quizSchema = mongoose.Schema({
    user: {
        type: String, //user email id
        required: true
    },
    title: {
        type: String,
        required: true
    },
    time: {
        type: timeSchema,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    }, 
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Quiz", quizSchema);