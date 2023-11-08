const express = require('express')
const router = express.Router()
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require('../../controller/courseController')
const { isInstructor } = require('../../middleware/authMiddleware')
const { createLesson } = require('../../controller/lessonController')


router.post('/', isInstructor, createCourse);
router.get('/', getCourses);
router.get('/:courseId', getCourseById);
router.put('/:courseId', updateCourse);
router.delete('/:courseId', deleteCourse);



module.exports = router;