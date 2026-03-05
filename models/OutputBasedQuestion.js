const mongoose = require('mongoose');

const outputBasedQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length === 4,
            message: 'Exactly 4 options are required'
        }
    },
    correctIndex: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    category: {
        type: String,
        enum: ['javascript', 'react'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    explanation: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

outputBasedQuestionSchema.index({ category: 1 });
outputBasedQuestionSchema.index({ difficulty: 1 });
outputBasedQuestionSchema.index({ category: 1, difficulty: 1 });
outputBasedQuestionSchema.index({ isActive: 1 });

const OutputBasedQuestion = mongoose.model('OutputBasedQuestion', outputBasedQuestionSchema);

module.exports = OutputBasedQuestion;
