const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./logger');

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const User = require('./models/User');

const app = express();

// Environment validation
const requiredEnvVars = ['MONGO_URI', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'SESSION_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    logger.error('Missing required environment variables:', missingVars);
    process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error(err));

// If running behind a proxy (e.g. Vercel), trust first proxy so secure cookies work
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Middleware
const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('CORS origin not allowed'));
    },
    credentials: true,
    exposedHeaders: ['X-Cache', 'X-Response-Time'] // Expose custom headers to frontend
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
        ttl: 24 * 60 * 60
    }),
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

// Passport configuration
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findOrCreateUser } = require('./controllers/userController');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.OAUTH_CALLBACK_URL || 'http://localhost:5000'}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        logger.info('Authentication attempt via Google');
        const user = await findOrCreateUser(profile);
        logger.info('Authentication successful');
        done(null, user);
    } catch (err) {
        logger.error('Google OAuth Error:', err);
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    logger.info('Serializing user:', user._id);
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        logger.debug('Deserializing user:', id);
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        logger.error('Deserialization error:', err);
        done(null, null);
    }
});

app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
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
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        logger.info('User logged out');
        res.redirect(process.env.CLIENT_URL);
    });
});

// Welcome endpoint
app.get('/', (req, res) => {
    logger.info('Welcome endpoint accessed');
    res.json({ message: 'Welcome to Frontend Mastery' });
});

// User Routes
app.use('/api', userRoutes);

// Module Routes
app.use('/api/modules', moduleRoutes);

// Lesson Routes
app.use('/api/lessons', lessonRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Server Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(5000, () => logger.info('Server running on http://localhost:5000'));