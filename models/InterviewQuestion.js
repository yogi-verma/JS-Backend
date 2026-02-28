const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    codingExamples: [{
        title: {
            type: String,
            trim: true
        },
        code: {
            type: String,
            required: true
        },
        explanation: {
            type: String,
            trim: true
        }
    }],
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Easy'
    },
    order: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
interviewQuestionSchema.index({ difficulty: 1 });
interviewQuestionSchema.index({ order: 1 });
interviewQuestionSchema.index({ category: 1 });

const InterviewQuestion = mongoose.model('InterviewQuestion', interviewQuestionSchema);

module.exports = InterviewQuestion;
