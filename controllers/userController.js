const User = require('../models/User');
const { generateKey, cacheWrapper } = require('../cache');
const crypto = require('crypto');

// Email service (for production, configure nodemailer)
// For now, we'll simulate email sending
const sendVerificationEmail = async (email, code) => {
    // TODO: In production, use nodemailer to send actual emails
    // For now, we'll just log it
    console.log(`\n========= EMAIL VERIFICATION =========`);
    console.log(`To: ${email}`);
    console.log(`Subject: Email Verification Code`);
    console.log(`Your verification code is: ${code}`);
    console.log(`This code will expire in 10 minutes.`);
    console.log(`======================================\n`);
    
    // In production, uncomment and configure:
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // });
    // await transporter.sendMail({
    //     from: process.env.EMAIL_USER,
    //     to: email,
    //     subject: 'Email Verification Code',
    //     html: `<p>Your verification code is: <strong>${code}</strong></p>`
    // });
    
    return true;
};

const findOrCreateUser = async (profile) => {
    try {
        console.log('Finding or creating user with googleId:', profile.id);
        
        // Generate cache key for this user
        const cacheKey = generateKey('user', 'google', profile.id);
        
        // Try to get from cache
        const { data: user, fromCache } = await cacheWrapper(
            cacheKey,
            1800, // 30 minutes TTL for user data
            async () => {
                const existingUser = await User.findOne({ googleId: profile.id });
                if (existingUser) {
                    console.log('User found in database:', existingUser._id);
                    return existingUser;
                }

                // Create new user if not found
                const newUser = new User({
                    googleId: profile.id,
                    displayName: profile.displayName || 'User',
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.id}@google.com`,
                    photo: profile.photos && profile.photos[0] ? profile.photos[0].value : ''
                });

                await newUser.save();
                console.log('New user created:', newUser._id);
                return newUser;
            }
        );
        
        if (fromCache) {
            console.log('User loaded from cache:', user._id);
        }
        
        return user;
    } catch (error) {
        console.error('Error in findOrCreateUser:', error);
        throw error;
    }
};

// Update user photo
const updatePhoto = async (req, res) => {
    try {
        const userId = req.user._id;
        const { photo } = req.body;

        if (!photo) {
            return res.status(400).json({ message: 'Photo URL is required' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { photo },
            { new: true }
        );

        console.log('Photo updated for user:', userId);
        res.json({ message: 'Photo updated successfully', user });
    } catch (error) {
        console.error('Error updating photo:', error);
        res.status(500).json({ message: 'Failed to update photo' });
    }
};

// Update display name
const updateDisplayName = async (req, res) => {
    try {
        const userId = req.user._id;
        const { displayName } = req.body;

        if (!displayName || displayName.trim().length === 0) {
            return res.status(400).json({ message: 'Display name is required' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { displayName: displayName.trim() },
            { new: true }
        );

        console.log('Display name updated for user:', userId);
        res.json({ message: 'Display name updated successfully', user });
    } catch (error) {
        console.error('Error updating display name:', error);
        res.status(500).json({ message: 'Failed to update display name' });
    }
};

// Update bio
const updateBio = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bio } = req.body;

        // Bio can be null or a string
        const user = await User.findByIdAndUpdate(
            userId,
            { bio: bio ? bio.trim() : null },
            { new: true }
        );

        console.log('Bio updated for user:', userId);
        res.json({ message: 'Bio updated successfully', user });
    } catch (error) {
        console.error('Error updating bio:', error);
        res.status(500).json({ message: 'Failed to update bio' });
    }
};

// Request email change - sends verification code
const requestEmailChange = async (req, res) => {
    try {
        const userId = req.user._id;
        const { newEmail } = req.body;

        if (!newEmail || !newEmail.includes('@')) {
            return res.status(400).json({ message: 'Valid email is required' });
        }

        // Check if email is already in use
        const existingUser = await User.findOne({ email: newEmail });
        if (existingUser && existingUser._id.toString() !== userId.toString()) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Generate 6-digit verification code
        const verificationCode = crypto.randomInt(100000, 999999).toString();

        // Store verification code in cache with 10 minutes TTL
        const { getCache } = require('../cache');
        const cache = getCache();
        const cacheKey = `email_verification:${userId}`;
        cache.set(cacheKey, {
            code: verificationCode,
            newEmail: newEmail,
            attempts: 0
        }, 600); // 10 minutes

        // Send verification email
        await sendVerificationEmail(newEmail, verificationCode);

        console.log('Email verification code sent to:', newEmail);
        res.json({ 
            message: 'Verification code sent to new email',
            email: newEmail 
        });
    } catch (error) {
        console.error('Error requesting email change:', error);
        res.status(500).json({ message: 'Failed to send verification code' });
    }
};

// Verify email change code and update email
const verifyEmailChange = async (req, res) => {
    try {
        const userId = req.user._id;
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: 'Verification code is required' });
        }

        // Get verification data from cache
        const { getCache } = require('../cache');
        const cache = getCache();
        const cacheKey = `email_verification:${userId}`;
        const verificationData = cache.get(cacheKey);

        if (!verificationData) {
            return res.status(400).json({ 
                message: 'Verification code expired or not found. Please request a new code.' 
            });
        }

        // Check attempts
        if (verificationData.attempts >= 5) {
            cache.del(cacheKey);
            return res.status(400).json({ 
                message: 'Too many failed attempts. Please request a new code.' 
            });
        }

        // Verify code
        if (verificationData.code !== code.trim()) {
            verificationData.attempts += 1;
            cache.set(cacheKey, verificationData, 600);
            return res.status(400).json({ 
                message: 'Invalid verification code',
                attemptsRemaining: 5 - verificationData.attempts
            });
        }

        // Update user email
        const user = await User.findByIdAndUpdate(
            userId,
            { email: verificationData.newEmail },
            { new: true }
        );

        // Clear verification data from cache
        cache.del(cacheKey);

        console.log('Email updated for user:', userId);
        res.json({ 
            message: 'Email updated successfully', 
            user 
        });
    } catch (error) {
        console.error('Error verifying email change:', error);
        res.status(500).json({ message: 'Failed to verify email change' });
    }
};

// Delete user account
const deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id;

        await User.findByIdAndDelete(userId);

        // Destroy session
        req.logout((err) => {
            if (err) {
                console.error('Error logging out:', err);
            }
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                }
                res.clearCookie('connect.sid');
                console.log('Account deleted for user:', userId);
                res.json({ message: 'Account deleted successfully' });
            });
        });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ message: 'Failed to delete account' });
    }
};

module.exports = { 
    findOrCreateUser,
    updatePhoto,
    updateDisplayName,
    updateBio,
    requestEmailChange,
    verifyEmailChange,
    deleteAccount
};
