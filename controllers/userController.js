const User = require('../models/User');
const { generateKey, cacheWrapper } = require('../cache');

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

module.exports = { findOrCreateUser };
