const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
    input: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    expectedOutput: {
        type: mongoose.Schema.Types.Mixed
    },
    description: {
        type: String,
        trim: true
    },
    isHidden: {
        type: Boolean,
        default: false
    }
}, { _id: false });

const exampleSchema = new mongoose.Schema({
    input: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    output: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    explanation: {
        type: String,
        trim: true
    }
}, { _id: false });

const codingQuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
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
        required: true,
        trim: true
    },
    functionName: {
        type: String,
        required: true,
        trim: true
    },
    starterCode: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    solutions: [
        {
            approach: {
                type: String,
                required: true,
                trim: true
            },
            explanation: {
                type: String,
                required: true,
                trim: true
            },
            code: {
                type: String,
                required: true
            }
        }
    ],
    testCases: {
        type: [testCaseSchema],
        validate: {
            validator: function (v) {
                return v && v.length >= 1;
            },
            message: 'At least one test case is required'
        }
    },
    examples: [exampleSchema],
    constraints: [{
        type: String,
        trim: true
    }],
    hints: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
codingQuestionSchema.index({ difficulty: 1 });
codingQuestionSchema.index({ order: 1 });
codingQuestionSchema.index({ category: 1 });
codingQuestionSchema.index({ slug: 1 });

const CodingQuestion = mongoose.model('CodingQuestion', codingQuestionSchema);

module.exports = CodingQuestion;
