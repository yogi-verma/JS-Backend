const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
require('./auth');

const userRoutes = require('./routes/userRoutes');
const User = require('./models/User'); // Adjust path to your User model

const app = express();

// If running behind a proxy (e.g. Vercel), trust first proxy so secure cookies work
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
// Allow frontend origin
const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like curl, Postman) or from allowedOrigins
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
        // Use 'none' in production so the cookie is sent in cross-site requests
        // (frontend and backend are on different origins). In non-production keep 'lax'.
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Serialization
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
        // After successful login, redirect to frontend dashboard
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
);

app.get('/auth/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

app.get('/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect(process.env.CLIENT_URL);
    });
});

// User Routes
app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));