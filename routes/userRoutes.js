const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/current_user', (req, res) => {
    console.log('Current user request - Session:', req.sessionID);
    console.log('User in session:', req.user);
    
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ 
            message: 'Not authenticated',
            sessionID: req.sessionID,
            hasSession: req.session ? true : false
        });
    }
});

// Debug endpoint to check session status
router.get('/debug', (req, res) => {
    res.json({
        authenticated: !!req.user,
        user: req.user,
        sessionID: req.sessionID,
        cookies: req.headers.cookie
    });
});

module.exports = router;
