const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findOrCreateUser } = require('../controllers/userController');
const AuthService = require('../services/authService');
const logger = require('../utils/logger');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.OAUTH_CALLBACK_URL || 'http://localhost:5000'}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        AuthService.logAuthAttempt('Google', profile);
        const user = await findOrCreateUser(profile);
        AuthService.logAuthSuccess(user);
        done(null, user);
    } catch (err) {
        AuthService.logAuthError(err);
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    logger.debug('Serializing user:', user._id);
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        logger.debug('Deserializing user:', id);
        const User = require('../models/User');
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        logger.error('Deserialization error:', err);
        done(null, null);
    }
});

module.exports = passport;
