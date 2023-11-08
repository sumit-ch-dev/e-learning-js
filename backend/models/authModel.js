const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
        unique: true,
    },
    role: { type: String, enum: ['Student', 'Instructor', 'Admin'], default: 'Student' },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// resetPasswordToken: {
//     type: String,
//     required: false,
//     default: null,
// },
// resetPasswordExpire: {
//     type: Date,
//     required: false,
//     default: null,
// },
// resetPassword: {
//     type: Boolean,
//     required: false,
//     default: false,
// },

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;