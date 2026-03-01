const express = require('express');
const router = express.Router();
const {
    getFrontendQuestions,
    getFrontendQuestionById,
    getFrontendQuestionsByCategory,
    getFrontendQuestionsStats,
    getCategories
} = require('../controllers/frontendQuestionController');

// GET /api/frontend-questions — get all questions (with optional ?category=...)
router.get('/', getFrontendQuestions);

// GET /api/frontend-questions/stats — get stats (total, by category, all categories)
router.get('/stats', getFrontendQuestionsStats);

// GET /api/frontend-questions/categories — list all seeded categories with counts
router.get('/categories', getCategories);

// GET /api/frontend-questions/category/:category — get questions by category
router.get('/category/:category', getFrontendQuestionsByCategory);

// GET /api/frontend-questions/:id — get single question by ID
router.get('/:id', getFrontendQuestionById);

module.exports = router;
