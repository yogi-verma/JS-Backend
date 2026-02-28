const mongoose = require('mongoose');

const userInterviewProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InterviewQuestion',
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
userInterviewProgressSchema.index({ userId: 1, questionId: 1 }, { unique: true });
userInterviewProgressSchema.index({ userId: 1 });

const UserInterviewProgress = mongoose.model('UserInterviewProgress', userInterviewProgressSchema);

module.exports = UserInterviewProgress;
