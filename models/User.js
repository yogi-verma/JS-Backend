const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    photo: { type: String },
    bio: { type: String, default: null },
    status: { 
        type: String, 
        enum: ['busy', 'focusing', 'building', 'optimistic', null],
        default: null 
    },
    website: { type: String, default: null },
    socialLinks: {
        github: { type: String, default: null },
        linkedin: { type: String, default: null },
        twitter: { type: String, default: null }
    },
    company: { type: String, default: null },
    title: { type: String, default: null }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
