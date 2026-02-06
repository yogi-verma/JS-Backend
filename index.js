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

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
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
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Serialization (CRITICAL FIX)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Auth Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URL}/`);
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

app.listen(5000, () => console.log('Server running on http://localhost:5000'));