// apis.js
const express = require('express');
const { getCourseDetails, addCourseDetails, updateCourseDetails, getCourseQuestions, getCourseQuestionsAndAnswers, getUserScore } = require('./models');
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
    const courseQuestions = await getCourseQuestions(req.body.courseId);
    if (courseQuestions) {
      res.json(courseQuestions);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get score for answers submitted by users based on course and question ids
router.post('/getscoreforquiz', async (req, res) => {
  try {
    const answersSelectedByUserById = req.body.answersById;
    const courseId = req.body.courseId;

    const userScore = await getUserScore(courseId, answersSelectedByUserById)

    if (userScore) {
      res.json(userScore);
    } else {
      res.status(404).json({ message: 'Could not process your quiz submission at this time' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint to get course questions and answers by id
router.post('/getcoursequizquestionbank', async (req, res) => {
  try {
    const courseQuestionsAndAnswers = await getCourseQuestionsAndAnswers(req.body.questionbankurl);
    if (courseQuestionsAndAnswers) {
      res.json(courseQuestionsAndAnswers);
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
