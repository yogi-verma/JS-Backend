const express = require('express');
const router = express.Router();
const {
    runTestCases,
    submitSolution,
    getUserProgress,
    getUserSubmission,
    getUserCodingStats,
    resetQuestionProgress,
    getSubmissions
} = require('../controllers/codingProgressController');

// Auth middleware
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

// POST /api/coding-progress/run — Run test cases (no auth required for "Run" button)
// But we still require auth to prevent abuse
router.post('/run', requireAuth, runTestCases);

// POST /api/coding-progress/submit — Submit solution (requires auth)
router.post('/submit', requireAuth, submitSolution);

// GET /api/coding-progress — Get all progress for logged-in user
router.get('/', requireAuth, getUserProgress);

// GET /api/coding-progress/stats — Get user's coding stats
router.get('/stats', requireAuth, getUserCodingStats);

// GET /api/coding-progress/submission/:questionId — Get user's submission for a question
router.get('/submission/:questionId', requireAuth, getUserSubmission);

// GET /api/coding-progress/submissions/:questionId — Get all submissions for a question
router.get('/submissions/:questionId', requireAuth, getSubmissions);

// DELETE /api/coding-progress/:questionId — Reset progress for a question
router.delete('/:questionId', requireAuth, resetQuestionProgress);

module.exports = router;
