const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
require('./auth');

const userRoutes = require('./routes/userRoutes');

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

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
);

app.get('/auth/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

app.get('/auth/logout', (req, res) => {
    req.logout(() => {
        res.redirect(process.env.CLIENT_URL);
    });
});

// User Routes
app.use('/api', userRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
