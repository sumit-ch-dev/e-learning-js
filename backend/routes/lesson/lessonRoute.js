const express = require('express');
const { createLesson, getLessons } = require('../../controller/lessonController');
const router = express.Router()


router.post('/:courseId', createLesson);
router.get('/:courseId', getLessons);

module.exports = router;