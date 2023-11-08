const Lesson = require('../models/lessonModel');
const Course = require('../models/courseModel');
const sendResponse = require('../utils/common');

// Controller function to create a lesson
const createLesson = async (req, res) => {
    try {
        // Extract lesson details from the request body
        const { title, contentType, contentData } = req.body;
        const { courseId } = req.params


        const course = await Course.findById(courseId);

        // Check if the course exists
        if (!course) {
            return sendResponse(res, 404, 'Course not found');
        }

        // Check if the content type is valid
        if (!['video', 'text'].includes(contentType)) {
            return sendResponse(res, 400, 'Invalid content type');
        }

        // Create a new lesson
        const newLesson = new Lesson({
            title,
            content: {
                type: contentType,
                data: contentData,
            },
        });

        // Save the lesson to the database
        await newLesson.save();

        course.lessons.push(newLesson);

        // Save the updated course
        await course.save();



        // Return success response
        return sendResponse(res, 201, 'Lesson created successfully', { lesson: newLesson });
    } catch (error) {
        // Handle errors and return error response using sendResponse
        console.error(error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

module.exports = {
    createLesson,
};
