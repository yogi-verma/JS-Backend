const express = require('express');
const router = express.Router();
const {
    toggleFrontendQuestionCompletion,
    getUserFrontendProgress
} = require('../controllers/frontendProgressController');

// Auth middleware
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

// All routes require authentication
router.use(requireAuth);

// GET /api/frontend-progress — get all progress for logged-in user
router.get('/', getUserFrontendProgress);

// PATCH /api/frontend-progress/:questionId/toggle — toggle completion
router.patch('/:questionId/toggle', toggleFrontendQuestionCompletion);

module.exports = router;
