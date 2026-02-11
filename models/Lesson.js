const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    moduleId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Module',
        required: true
    },
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true,
        trim: true
    },
    content: { 
        type: String, 
        required: true
    },
    order: { 
        type: Number, 
        required: true,
        min: 0
    },
    isPublished: { 
        type: Boolean, 
        default: false
    },
    estimatedDuration: {
        type: Number, // in minutes
        required: true,
        min: 1
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    type: {
        type: String,
        enum: ['theory', 'practice', 'quiz', 'project'],
        default: 'theory'
    },
    prerequisites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    tags: [{
        type: String,
        trim: true
    }],
    images: [{
        url: {
            type: String,
            required: true
        },
        caption: {
            type: String,
            trim: true
        },
        alt: {
            type: String,
            trim: true
        }
    }],
    resources: [{
        title: String,
        type: {
            type: String,
            enum: ['video', 'article', 'documentation', 'github', 'external'],
            default: 'article'
        },
        url: String,
        description: String
    }],
    interviewQuestions: [{
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
        difficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner'
        },
        category: {
            type: String,
            trim: true
        }
    }]
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for lesson progression
lessonSchema.virtual('isCompleted', {
    ref: 'UserProgress',
    localField: '_id',
    foreignField: 'lessonId',
    justOne: true
});

// Indexes for better query performance
lessonSchema.index({ moduleId: 1, order: 1 });
lessonSchema.index({ moduleId: 1, isPublished: 1 });
lessonSchema.index({ order: 1 });
lessonSchema.index({ type: 1 });

// Pre-save middleware to validate order uniqueness within a module
lessonSchema.pre('save', async function(next) {
    if (this.isModified('order')) {
        const existingLesson = await this.constructor.findOne({ 
            moduleId: this.moduleId, 
            order: this.order 
        });
        if (existingLesson && !existingLesson._id.equals(this._id)) {
            const error = new Error('Lesson order must be unique within a module');
            error.name = 'ValidationError';
            return next(error);
        }
    }
    next();
});

// Pre-remove middleware to handle dependencies
lessonSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
        // Remove this lesson from prerequisites of other lessons
        await this.constructor.updateMany(
            { prerequisites: this._id },
            { $pull: { prerequisites: this._id } }
        );
        
        // Remove user progress for this lesson
        const UserProgress = mongoose.model('UserProgress');
        await UserProgress.deleteMany({ lessonId: this._id });
        
        next();
    } catch (error) {
        next(error);
    }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
