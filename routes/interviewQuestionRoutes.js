const express = require('express');
const router = express.Router();
const {
    getInterviewQuestions,
    getInterviewQuestionById,
    getInterviewQuestionsByDifficulty,
    getInterviewQuestionsStats
} = require('../controllers/interviewQuestionController');

// GET /api/interview-questions — get all questions (with optional ?difficulty=Easy&category=...)
router.get('/', getInterviewQuestions);

// GET /api/interview-questions/stats — get stats
router.get('/stats', getInterviewQuestionsStats);

// GET /api/interview-questions/difficulty/:difficulty — get by difficulty (Easy, Medium, Hard)
router.get('/difficulty/:difficulty', getInterviewQuestionsByDifficulty);

// GET /api/interview-questions/:id — get single question
router.get('/:id', getInterviewQuestionById);

module.exports = router;
