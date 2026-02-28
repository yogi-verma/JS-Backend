const express = require('express');
const router = express.Router();
const {
    toggleQuestionCompletion,
    getUserProgress
} = require('../controllers/interviewProgressController');

// Auth middleware
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

// All routes require authentication
router.use(requireAuth);

// GET /api/interview-progress — get all progress for logged-in user
router.get('/', getUserProgress);

// PATCH /api/interview-progress/:questionId/toggle — toggle completion
router.patch('/:questionId/toggle', toggleQuestionCompletion);

module.exports = router;
