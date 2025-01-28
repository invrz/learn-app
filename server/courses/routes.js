// apis.js
const express = require('express');
const { getCourseDetails, addCourseDetails, updateCourseDetails, getCourseQuestions } = require('./models');
const router = express.Router();

// Endpoint to get course details by id
router.get('/getcourse/:courseid', async (req, res) => {
  try {
    const course = await getCourseDetails(req.params.courseid);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get course questions by id
router.post('/getcoursequizquestions', async (req, res) => {
  try {
    const courseQuestions = await getCourseQuestions(req.body.questionbankurl);
    if (courseQuestions) {
      res.json(courseQuestions);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to add a new course
router.post('/addcourse', async (req, res) => {
  try {
    const newCourse = await addCourseDetails(req.body[0]);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to update an existing course
router.post('/updatecourse', async (req, res) => {
  try {
    const updatedCourse = await updateCourseDetails(req.body[0]);
    res.status(201).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
