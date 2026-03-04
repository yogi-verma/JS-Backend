const mongoose = require('mongoose');

const dailyQuizQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    // For output-based questions, include the code snippet in the question itself.
    // The 'questionType' field signals the frontend to render it differently.
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length === 4,
            message: 'Exactly 4 options are required'
        }
    },
    // 0-indexed position in the options array
    correctIndex: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    explanation: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['javascript', 'react'],
        required: true
    },
    // 'theory'  → conceptual question
    // 'output'  → "what is the output of this code?" question
    questionType: {
        type: String,
        enum: ['theory', 'output'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    tags: {
        type: [String],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

dailyQuizQuestionSchema.index({ category: 1, questionType: 1 });
dailyQuizQuestionSchema.index({ difficulty: 1 });
dailyQuizQuestionSchema.index({ isActive: 1 });

const DailyQuizQuestion = mongoose.model('DailyQuizQuestion', dailyQuizQuestionSchema);

module.exports = DailyQuizQuestion;
