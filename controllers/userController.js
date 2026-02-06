const User = require('../models/User');

const findOrCreateUser = async (profile) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) return existingUser;

        const newUser = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
            photo: profile.photos && profile.photos[0] ? profile.photos[0].value : ''
        });

        await newUser.save();
        return newUser;
    } catch (error) {
        console.error('Error in findOrCreateUser:', error);
        throw error;
    }
};

module.exports = { findOrCreateUser };
