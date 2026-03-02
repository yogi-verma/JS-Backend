const express = require('express');
const router = express.Router();
const {
    getCodingQuestions,
    getCodingQuestionById,
    getCodingQuestionBySlug,
    getCodingQuestionsByDifficulty,
    getCodingQuestionsStats,
    getCodingCategories
} = require('../controllers/codingQuestionController');

// GET /api/coding-questions — get all questions (with optional ?difficulty=Easy&category=...)
router.get('/', getCodingQuestions);

// GET /api/coding-questions/stats — get stats
router.get('/stats', getCodingQuestionsStats);

// GET /api/coding-questions/categories — get all categories
router.get('/categories', getCodingCategories);

// GET /api/coding-questions/difficulty/:difficulty — get by difficulty (Easy, Medium, Hard)
router.get('/difficulty/:difficulty', getCodingQuestionsByDifficulty);

// GET /api/coding-questions/slug/:slug — get by slug
router.get('/slug/:slug', getCodingQuestionBySlug);

// GET /api/coding-questions/:id — get single question by ID
router.get('/:id', getCodingQuestionById);

module.exports = router;
