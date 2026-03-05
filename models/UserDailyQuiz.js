const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DailyQuizQuestion',
        required: true
    },
    selectedIndex: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
}, { _id: false });

const userDailyQuizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // YYYY-MM-DD string – used to identify the quiz slot for a given day
    quizDate: {
        type: String,
        required: true
    },
    // The 5 questions assigned to this user for this day
    questionIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DailyQuizQuestion'
    }],
    // Populated once the user submits
    answers: {
        type: [answerSchema],
        default: []
    },
    score: {
        type: Number,
        default: 0
    },
    totalQuestions: {
        type: Number,
        default: 5
    },
    completed: {
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

// A user can only have ONE quiz record per day
userDailyQuizSchema.index({ userId: 1, quizDate: 1 }, { unique: true });

const UserDailyQuiz = mongoose.model('UserDailyQuiz', userDailyQuizSchema);

// Drop stale indexes from previous schema versions (e.g. attemptDate)
UserDailyQuiz.collection.getIndexes()
    .then(indexes => {
        const staleIndexes = Object.keys(indexes).filter(
            name => name.includes('attemptDate')
        );
        return Promise.all(
            staleIndexes.map(name => {
                console.log(`[INFO] Dropping stale index "${name}" from userdailyquizzes`);
                return UserDailyQuiz.collection.dropIndex(name);
            })
        );
    })
    .catch(() => { /* collection may not exist yet – safe to ignore */ });

module.exports = UserDailyQuiz;
