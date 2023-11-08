require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const configRoutes = require('./routes/index')


app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }))

app.use(cookieParser())

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

configRoutes(app)

module.exports = app;