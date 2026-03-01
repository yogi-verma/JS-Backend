const mongoose = require('mongoose');

const userFrontendProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FrontendQuestion',
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Compound unique index — one record per user per question
userFrontendProgressSchema.index({ userId: 1, questionId: 1 }, { unique: true });
userFrontendProgressSchema.index({ userId: 1 });

const UserFrontendProgress = mongoose.model('UserFrontendProgress', userFrontendProgressSchema);

module.exports = UserFrontendProgress;
