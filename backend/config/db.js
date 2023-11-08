// src/db.js
const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/e-learning-test"

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected to mongodb");
    } catch (error) {
        console.log('could not connect to mongodb', error)
    }
};

module.exports = connectDB