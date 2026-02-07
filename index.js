require('dotenv').config();

const express = require('express');
const passport = require('passport');

const { validateEnv } = require('./config/env');
const connectDB = require('./config/database');
const corsMiddleware = require('./middleware/cors');
const sessionMiddleware = require('./middleware/session');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const AuthService = require('./services/authService');
require('./config/passport');

const userRoutes = require('./routes/userRoutes');

const app = express();

validateEnv();
connectDB();

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

app.use(corsMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    logger.info('Welcome endpoint accessed');
    res.json({ message: 'Welcome to Frontend Mastery' });
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
);

app.get('/auth/failure', (req, res) => {
    res.status(401).json({ message: 'Failed to authenticate' });
});

app.get('/auth/logout', (req, res) => {
    const userId = req.user?._id;
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        AuthService.logLogout(userId);
        res.redirect(process.env.CLIENT_URL);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on http://localhost:${PORT}`));