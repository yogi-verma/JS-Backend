const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {
    updatePhoto,
    updateDisplayName,
    updateBio,
    requestEmailChange,
    verifyEmailChange,
    deleteAccount
} = require('../controllers/userController');

// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

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

// Set a test value on the session so you can verify the session is persisted
router.get('/set_test_session', (req, res) => {
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
    const cookieOptions = {
        httpOnly: false,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
    };
    res.cookie('test_cookie', '1', cookieOptions);
    res.json({ ok: true, message: 'Test cookie set', cookieOptions });
});

// ========= NEW USER MANAGEMENT ROUTES =========

// Update user photo
router.patch('/user/update-photo', requireAuth, updatePhoto);

// Update display name
router.patch('/user/update-display-name', requireAuth, updateDisplayName);

// Update bio
router.patch('/user/update-bio', requireAuth, updateBio);

// Request email change (sends verification code)
router.post('/user/request-email-change', requireAuth, requestEmailChange);

// Verify email change code and update email
router.post('/user/verify-email-change', requireAuth, verifyEmailChange);

// Delete account
router.delete('/user/delete-account', requireAuth, deleteAccount);

module.exports = router;
