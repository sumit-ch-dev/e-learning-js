const mongoose = require('mongoose');
const lessonSchema = require('./lessonModel');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    lessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
        },
    ],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
