const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    testCaseIndex: {
        type: Number,
        required: true
    },
    passed: {
        type: Boolean,
        required: true
    },
    actualOutput: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    expectedOutput: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    error: {
        type: String,
        default: null
    },
    executionTime: {
        type: Number,
        default: 0
    }
}, { _id: false });

const userCodingProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CodingQuestion',
        required: true
    },
    isSolved: {
        type: Boolean,
        default: false
    },
    submittedCode: {
        type: String,
        default: ''
    },
    attempts: {
        type: Number,
        default: 0
    },
    solvedAt: {
        type: Date,
        default: null
    },
    lastAttemptAt: {
        type: Date,
        default: null
    },
    lastTestResults: [testResultSchema],
    submissions: [{
        code: {
            type: String,
            required: true
        },
        accepted: {
            type: Boolean,
            required: true
        },
        passedTests: {
            type: Number,
            default: 0
        },
        totalTests: {
            type: Number,
            default: 0
        },
        totalExecutionTime: {
            type: Number,
            default: 0
        },
        submittedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Compound unique index — one record per user per question
userCodingProgressSchema.index({ userId: 1, questionId: 1 }, { unique: true });
userCodingProgressSchema.index({ userId: 1 });
userCodingProgressSchema.index({ userId: 1, isSolved: 1 });

const UserCodingProgress = mongoose.model('UserCodingProgress', userCodingProgressSchema);

module.exports = UserCodingProgress;
