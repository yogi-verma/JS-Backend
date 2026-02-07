const express = require('express');
const router = express.Router();
const User = require('../models/User');
const logger = require('../utils/logger');

router.get('/current_user', (req, res) => {
    logger.debug('Current user request - Session:', req.sessionID);
    logger.debug('User in session:', req.user);
    
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
    logger.debug('Debug endpoint accessed');
    res.json({
        authenticated: !!req.user,
        user: req.user,
        sessionID: req.sessionID,
        cookies: req.headers.cookie
    });
});

// Set a test value on the session so you can verify the session is persisted
router.get('/set_test_session', (req, res) => {
    logger.debug('Setting test session value');
    req.session.test = 'ok';
    res.json({
        ok: true,
        message: 'Test session value set',
        sessionID: req.sessionID,
        session: req.session,
        cookiesHeader: req.headers.cookie
    });
});

// Return session and cookie details for debugging cross-site cookie behaviour
router.get('/session_info', (req, res) => {
    logger.debug('Session info endpoint accessed');
    res.json({
        authenticated: !!req.user,
        user: req.user,
        sessionID: req.sessionID,
        hasSession: !!req.session,
        sessionCookie: req.session ? req.session.cookie : null,
        cookiesHeader: req.headers.cookie
    });
});

// Set a client-visible test cookie with the same cookie options used by the session
router.get('/set_test_cookie', (req, res) => {
    logger.debug('Setting test cookie');
    const cookieOptions = {
        httpOnly: false,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
    };
    res.cookie('test_cookie', '1', cookieOptions);
    res.json({ ok: true, message: 'Test cookie set', cookieOptions });
});

module.exports = router;
