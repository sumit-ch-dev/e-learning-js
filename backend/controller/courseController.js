const Course = require('../models/courseModel');
const User = require('../models/userModel');
const sendResponse = require('../utils/common')



// Controller function to create a new course
const createCourse = async (req, res) => {
    try {
        // console.log(req.user)
        // add user id to course

        // Extract course details from the request body
        const { title, description } = req.body;

        // Create a new course instance
        const newCourse = new Course({
            title,
            description,
            instructor: req.user.id,
        });

        // Save the new course to the database
        const savedCourse = await newCourse.save();

        const instructor = await User.findById(req.user.id)

        // Return success response using sendResponse
        return sendResponse(res, 201, 'Course successfully created', {
            courseId: savedCourse._id,
            title: savedCourse.title,
            instructor: instructor.profile,
            description: savedCourse.description,
            createdAt: savedCourse.createdAt,
        });
    } catch (error) {
        // Handle errors and return error response using sendResponse
        console.error(error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

const getCourses = async (req, res) => {
    try {
        // Fetch all courses from the database
        const courses = await Course.find().populate('instructor', 'profile');

        // Return success response using sendResponse
        return sendResponse(res, 200, 'Courses successfully retrieved', { courses });
    } catch (error) {
        // Handle errors and return error response using sendResponse
        console.error(error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

const getCourseById = async (req, res) => {
    try {
        // Extract the course ID from the request parameters
        const courseId = req.params.courseId;

        // Fetch the course from the database using the ID
        const course = await Course.findById(courseId).populate('instructor', 'profile')

        // Check if the course exists
        if (!course) {
            return sendResponse(res, 404, 'Course not found');
        }

        // Return success response using sendResponse
        return sendResponse(res, 200, 'Course successfully retrieved', { course });
    } catch (error) {
        // Handle errors and return error response using sendResponse
        console.error(error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

const updateCourse = async (req, res) => {
    try {
        // Extract the course ID from the request parameters
        const courseId = req.params.courseId;

        // Extract the updated course details from the request body
        const { title, description } = req.body;

        // Fetch the course from the database using the ID
        const course = await Course.findById(courseId);

        // Check if the course exists
        if (!course) {
            return sendResponse(res, 404, 'Course not found');
        }

        // Update the course details
        course.title = title || course.title;
        course.description = description || course.description;

        // Save the updated course to the database
        const updatedCourse = await course.save();

        // Return success response using sendResponse
        return sendResponse(res, 200, 'Course successfully updated', { course: updatedCourse });
    } catch (error) {
        // Handle errors and return error response using sendResponse
        console.error(error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

const deleteCourse = async (req, res) => {
    try {
        // Extract the course ID from the request parameters
        const courseId = req.params.courseId;

        // Fetch the course from the database using the ID
        const course = await Course.findById(courseId);

        // Check if the course exists
        if (!course) {
            return sendResponse(res, 404, 'Course not found');
        }

        // Delete the course from the database
        await course.deleteOne()

        // Return success response using sendResponse
        return sendResponse(res, 200, 'Course successfully deleted');
    } catch (error) {
        // Handle errors and return error response using sendResponse
        console.error(error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// Add more controller functions as needed (e.g., getCourse, updateCourse, deleteCourse)

module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};
