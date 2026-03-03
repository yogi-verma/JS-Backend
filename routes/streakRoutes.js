const express = require('express');
const router = express.Router();
const {
    getStreak,
    getCalendar,
    getActivityHistory
} = require('../controllers/streakController');

// Auth middleware
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

// GET /api/streak — Current streak summary (current streak, longest streak, etc.)
router.get('/', requireAuth, getStreak);

// GET /api/streak/calendar?year=2026&month=3 — Calendar heatmap data for month/year
router.get('/calendar', requireAuth, getCalendar);

// GET /api/streak/history?days=365 — Full activity history for heatmap (last N days)
router.get('/history', requireAuth, getActivityHistory);

module.exports = router;
