const User = require('../models/User');

const findOrCreateUser = async (profile) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) return existingUser;

    const newUser = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
    });

    await newUser.save();
    return newUser;
};

module.exports = { findOrCreateUser };
