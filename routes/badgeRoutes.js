const express = require('express');
const router = express.Router();
const {
    getUserBadges,
    getUnseenBadges,
    markBadgesAsSeen,
    getBadgeDefinitions
} = require('../controllers/badgeController');

// Auth middleware
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

// GET /api/badges — All badges for the logged-in user (earned + unearned)
router.get('/', requireAuth, getUserBadges);

// GET /api/badges/unseen — Unseen badges (triggers popup on frontend)
router.get('/unseen', requireAuth, getUnseenBadges);

// GET /api/badges/definitions — Public list of all available badge milestones
router.get('/definitions', getBadgeDefinitions);

// PATCH /api/badges/seen — Mark badges as seen (dismiss popup)
router.patch('/seen', requireAuth, markBadgesAsSeen);

module.exports = router;
