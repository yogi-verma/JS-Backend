const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
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
    icon: { 
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
        type: Number, // in hours
        required: true,
        min: 1
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    prerequisites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module'
    }],
    tags: [{
        type: String,
        trim: true
    }]
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for lesson count
moduleSchema.virtual('lessonCount', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'moduleId',
    count: true
});

// Index for better query performance
moduleSchema.index({ name: 1 });
moduleSchema.index({ order: 1 });
moduleSchema.index({ isPublished: 1 });

// Pre-save middleware to validate order uniqueness
moduleSchema.pre('save', async function(next) {
    if (this.isModified('order')) {
        const existingModule = await this.constructor.findOne({ order: this.order });
        if (existingModule && !existingModule._id.equals(this._id)) {
            const error = new Error('Module order must be unique');
            error.name = 'ValidationError';
            return next(error);
        }
    }
    next();
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
