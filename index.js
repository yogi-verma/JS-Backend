const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

const app = express();

// Environment validation
const requiredEnvVars = ['MONGO_URI', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'SESSION_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

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
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: false,
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
        console.log('Authentication attempt via Google');
        const user = await findOrCreateUser(profile);
        console.log('Authentication successful');
        done(null, user);
    } catch (err) {
        console.error('Google OAuth Error:', err);
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user._id);
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializing user:', id);
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        console.error('Deserialization error:', err);
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
        console.log('User logged out');
        res.redirect(process.env.CLIENT_URL);
    });
});

// Welcome endpoint
app.get('/', (req, res) => {
    console.log('Welcome endpoint accessed');
    res.json({ message: 'Welcome to Frontend Mastery' });
});

// User Routes
app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));