const express = require('express');
const router = express.Router();
const {
    getDailyQuizStatus,
    getDailyQuiz,
    submitDailyQuiz,
    getQuizHistory
} = require('../controllers/dailyQuizController');

// Auth middleware
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

// GET /api/daily-quiz/status — Check if user already completed today's quiz
router.get('/status', requireAuth, getDailyQuizStatus);

// GET /api/daily-quiz/history — Get user's quiz history (last 30)
router.get('/history', requireAuth, getQuizHistory);

// GET /api/daily-quiz — Fetch today's 5 questions (creates record if first visit)
router.get('/', requireAuth, getDailyQuiz);

// POST /api/daily-quiz/submit — Submit answers and get results
router.post('/submit', requireAuth, submitDailyQuiz);

module.exports = router;
