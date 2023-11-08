// import { Application, Request, Response } from "express";
// const express = require('express')
const HTTP_STATUS = require('../constants/statusCodes');
const sendResponse = require('../utils/common');
const auth = require('./auth/authRoute');
const course = require('./course/courseRoute')
// import auth from './user/authRoutes'
// import course from './courses/courseRoutes'

const constructorMethod = (app) => {
    app.use('/api/auth', auth)
    app.use('/api/course', course)
    // app.use('/api/courses', course)

    app.use('*', (req, res) => {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "not found")
    })
}


module.exports = constructorMethod;