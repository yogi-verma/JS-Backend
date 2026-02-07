const User = require('../models/User');
const logger = require('../utils/logger');

const findOrCreateUser = async (profile) => {
    try {
        logger.debug('Finding or creating user with googleId:', profile.id);
        
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            logger.debug('User found:', existingUser._id);
            return existingUser;
        }

        const newUser = new User({
            googleId: profile.id,
            displayName: profile.displayName || 'User',
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.id}@google.com`,
            photo: profile.photos && profile.photos[0] ? profile.photos[0].value : ''
        });

        await newUser.save();
        logger.info('New user created:', newUser._id);
        return newUser;
    } catch (error) {
        logger.error('Error in findOrCreateUser:', error);
        throw error;
    }
};

module.exports = { findOrCreateUser };
