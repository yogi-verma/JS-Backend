const mongoose = require('mongoose');

const activeDaySchema = new mongoose.Schema({
    date: {
        type: String,       // 'YYYY-MM-DD' format for easy calendar mapping
        required: true
    },
    count: {
        type: Number,       // Number of problems solved that day
        default: 1
    }
}, { _id: false });

const userStreakSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    currentStreak: {
        type: Number,
        default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    },
    lastActiveDate: {
        type: String,       // 'YYYY-MM-DD' — the most recent day user solved a problem
        default: null
    },
    activeDays: [activeDaySchema],
    totalActiveDays: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for leaderboard queries (optional future use)
userStreakSchema.index({ currentStreak: -1 });
userStreakSchema.index({ longestStreak: -1 });

const UserStreak = mongoose.model('UserStreak', userStreakSchema);

module.exports = UserStreak;
