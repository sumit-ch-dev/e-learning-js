const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['video', 'text'],
        required: true,
    },
    url: {
        type: String,
        required: function () {
            return this.type === 'video';
        },
    },
    content: {
        type: String,
        required: function () {
            return this.type === 'text';
        },
    },
});

module.exports = contentSchema;
