const mongoose = require('mongoose');
// const contentSchema = require('./contentModel');
const quizSchema = require('./quizModel');
const assignmentSchema = require('./assignmentModel');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: {
            type: String,
            enum: ['video', 'text'],
            required: true,
        },
        data: {
            type: String,
            required: true,
        },
    },
    quiz: {
        type: quizSchema,
    },
    assignment: {
        type: assignmentSchema,
    },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
