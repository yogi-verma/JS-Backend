const mongoose = require('mongoose');

const userBadgeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    badgeId: {
        type: String,           // e.g. 'streak_15', 'streak_30', 'streak_45', 'streak_90'
        required: true
    },
    name: {
        type: String,           // Human-readable name
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,           // Emoji or icon identifier
        required: true
    },
    tier: {
        type: String,
        enum: ['bronze', 'silver', 'gold', 'platinum'],
        required: true
    },
    milestone: {
        type: Number,           // The streak day count that triggered this badge
        required: true
    },
    earnedAt: {
        type: Date,
        default: Date.now
    },
    seen: {
        type: Boolean,          // Has the user seen/dismissed the popup?
        default: false
    }
}, {
    timestamps: true
});

// A user can earn each badge only once
userBadgeSchema.index({ userId: 1, badgeId: 1 }, { unique: true });

// Quick lookup for all badges of a user
userBadgeSchema.index({ userId: 1, earnedAt: -1 });

const UserBadge = mongoose.model('UserBadge', userBadgeSchema);

module.exports = UserBadge;
