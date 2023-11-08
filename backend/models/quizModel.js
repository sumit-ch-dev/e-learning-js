const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true,
            },
            options: [{ type: String }],
            correctOption: {
                type: Number,
                required: true,
            },
        },
    ],
});

module.exports = quizSchema;
