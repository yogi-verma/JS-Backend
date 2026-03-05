const express = require('express');
const router = express.Router();
const {
    getOutputBasedQuestions,
    getOutputBasedQuestionById,
    getOutputBasedQuestionsByCategory,
    getOutputBasedQuestionsStats
} = require('../controllers/outputBasedQuestionController');

// GET /api/output-based-questions/stats — Get question counts by category & difficulty
router.get('/stats', getOutputBasedQuestionsStats);

// GET /api/output-based-questions/category/:category — Get questions by category (javascript | react)
router.get('/category/:category', getOutputBasedQuestionsByCategory);

// GET /api/output-based-questions/:id — Get a single question by ID
router.get('/:id', getOutputBasedQuestionById);

// GET /api/output-based-questions — Get all questions (supports ?category=&difficulty=&page=&limit=)
router.get('/', getOutputBasedQuestions);

module.exports = router;
