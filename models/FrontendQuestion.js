const mongoose = require('mongoose');

const frontendQuestionSchema = new mongoose.Schema({
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
    category: {
        type: String,
        required: true,
        enum: [
            'HTML & WEB FUNDAMENTALS',
            'CSS (ADVANCED)',
            'JAVASCRIPT CORE (DEEP)',
            'JAVASCRIPT DESIGN PATTERNS & CONCEPTS',
            'TYPESCRIPT (ADVANCED)',
            'FRONTEND FRAMEWORKS (REACT FOCUSED)',
            'STATE MANAGEMENT',
            'PERFORMANCE OPTIMIZATION',
            'BROWSER & WEB APIS',
            'NETWORKING & APIS',
            'SECURITY',
            'ACCESSIBILITY (A11Y)',
            'RENDERING STRATEGIES (SSR, SSG, ISR)',
            'TOOLING & BUILD SYSTEMS',
            'TESTING',
            'ARCHITECTURE & SCALABILITY',
            'UX & PRODUCT THINKING',
            'DEVOPS & PRODUCTION',
            'DEBUGGING & TROUBLESHOOTING',
            'ENGINEERING MATURITY'
        ],
        trim: true
    },
    order: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
frontendQuestionSchema.index({ category: 1 });
frontendQuestionSchema.index({ order: 1 });
frontendQuestionSchema.index({ category: 1, order: 1 }, { unique: true });

const FrontendQuestion = mongoose.model('FrontendQuestion', frontendQuestionSchema);

module.exports = FrontendQuestion;
