const DailyQuizQuestion = require('../models/DailyQuizQuestion');
const UserDailyQuiz = require('../models/UserDailyQuiz');
const logger = require('../logger');

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Returns today's date string in YYYY-MM-DD format (UTC).
 */
const getTodayString = () => new Date().toISOString().split('T')[0];

/**
 * Pick `count` random items from an array (Fisher-Yates partial shuffle).
 */
const pickRandom = (arr, count) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
};

// ─── Controllers ────────────────────────────────────────────────────────────

/**
 * GET /api/daily-quiz/status
 * Returns whether the user has already completed today's quiz.
 * Also returns the existing score/results if completed.
 */
const getDailyQuizStatus = async (req, res) => {
    try {
        const userId = req.user._id;
        const today = getTodayString();

        const record = await UserDailyQuiz.findOne({ userId, quizDate: today });

        if (!record) {
            return res.json({
                success: true,
                data: {
                    completed: false,
                    quizDate: today
                }
            });
        }

        // Return status. If completed, include summary but NOT correct answers yet
        // (they get full details only via the submit response or a separate results call).
        return res.json({
            success: true,
            data: {
                completed: record.completed,
                quizDate: today,
                score: record.score,
                totalQuestions: record.totalQuestions,
                completedAt: record.completedAt
            }
        });
    } catch (error) {
        logger.error('getDailyQuizStatus error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

/**
 * GET /api/daily-quiz
 * Returns today's 5 quiz questions for the authenticated user.
 * - If the user already has a record for today (but hasn't submitted yet), returns the same questions.
 * - If the user has ALREADY completed today's quiz, returns the results with explanations.
 * - Correct answers are NEVER returned in the "questions" response – only after submission.
 */
const getDailyQuiz = async (req, res) => {
    try {
        const userId = req.user._id;
        const today = getTodayString();

        // Check for an existing record
        let record = await UserDailyQuiz.findOne({ userId, quizDate: today }).populate('questionIds');

        // If already completed, return results directly
        if (record && record.completed) {
            const detailedResults = buildResults(record);
            return res.json({
                success: true,
                data: {
                    alreadyCompleted: true,
                    score: record.score,
                    totalQuestions: record.totalQuestions,
                    completedAt: record.completedAt,
                    results: detailedResults
                }
            });
        }

        // If record exists but not yet submitted, return questions without answers
        if (record) {
            return res.json({
                success: true,
                data: {
                    alreadyCompleted: false,
                    quizDate: today,
                    questions: sanitizeQuestions(record.questionIds)
                }
            });
        }

        // No record yet – pick 5 random active questions
        const allQuestions = await DailyQuizQuestion.find({ isActive: true }).lean();

        if (allQuestions.length < 5) {
            return res.status(503).json({
                success: false,
                message: 'Not enough quiz questions in the database. Please seed the database first.'
            });
        }

        // Try to maintain an even spread: ~2-3 JS, ~2 React, ~2-3 theory, ~2 output
        const jsTheory  = allQuestions.filter(q => q.category === 'javascript' && q.questionType === 'theory');
        const jsOutput  = allQuestions.filter(q => q.category === 'javascript' && q.questionType === 'output');
        const rxTheory  = allQuestions.filter(q => q.category === 'react'      && q.questionType === 'theory');
        const rxOutput  = allQuestions.filter(q => q.category === 'react'      && q.questionType === 'output');

        let selected = [];

        // Best-effort balanced selection: 2 JS theory, 1 JS output, 1 React theory, 1 React output
        // Falls back gracefully if any bucket is underpopulated.
        const tryPick = (bucket, n) => pickRandom(bucket, Math.min(n, bucket.length));

        selected = [
            ...tryPick(jsTheory, 2),
            ...tryPick(jsOutput,  1),
            ...tryPick(rxTheory,  1),
            ...tryPick(rxOutput,  1)
        ];

        // If we ended up with fewer than 5 (some buckets were empty), fill from remaining pool
        if (selected.length < 5) {
            const usedIds = new Set(selected.map(q => q._id.toString()));
            const remaining = allQuestions.filter(q => !usedIds.has(q._id.toString()));
            selected = [...selected, ...pickRandom(remaining, 5 - selected.length)];
        }

        // Shuffle final selection so category order is mixed
        selected = pickRandom(selected, selected.length);

        const questionIds = selected.map(q => q._id);

        record = await UserDailyQuiz.create({
            userId,
            quizDate: today,
            questionIds,
            totalQuestions: 5
        });

        return res.json({
            success: true,
            data: {
                alreadyCompleted: false,
                quizDate: today,
                questions: sanitizeQuestions(selected)
            }
        });
    } catch (error) {
        logger.error('getDailyQuiz error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

/**
 * POST /api/daily-quiz/submit
 * Body: { answers: [{ questionId, selectedIndex }] }
 * Validates answers, saves progress, returns detailed results.
 */
const submitDailyQuiz = async (req, res) => {
    try {
        const userId = req.user._id;
        const today = getTodayString();
        const { answers } = req.body;

        if (!Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'answers array is required'
            });
        }

        // Find the user's quiz record for today
        const record = await UserDailyQuiz.findOne({ userId, quizDate: today }).populate('questionIds');

        if (!record) {
            return res.status(400).json({
                success: false,
                message: 'No daily quiz found for today. Please fetch the quiz first.'
            });
        }

        if (record.completed) {
            // Already submitted – just return the stored results
            return res.json({
                success: true,
                message: 'You already completed today\'s quiz.',
                data: {
                    alreadyCompleted: true,
                    score: record.score,
                    totalQuestions: record.totalQuestions,
                    completedAt: record.completedAt,
                    results: buildResults(record)
                }
            });
        }

        // Build a map for quick lookup: questionId → question doc
        const questionMap = {};
        for (const q of record.questionIds) {
            questionMap[q._id.toString()] = q;
        }

        // Validate & score
        const scoredAnswers = [];
        let score = 0;

        for (const ans of answers) {
            const { questionId, selectedIndex } = ans;

            if (typeof selectedIndex !== 'number' || selectedIndex < 0 || selectedIndex > 3) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid selectedIndex for question ${questionId}`
                });
            }

            const question = questionMap[questionId];
            if (!question) {
                return res.status(400).json({
                    success: false,
                    message: `Question ${questionId} does not belong to today's quiz`
                });
            }

            const isCorrect = question.correctIndex === selectedIndex;
            if (isCorrect) score++;

            scoredAnswers.push({ questionId: question._id, selectedIndex, isCorrect });
        }

        // Handle partially answered quizzes (user skipped some)
        const answeredIds = new Set(scoredAnswers.map(a => a.questionId.toString()));
        for (const q of record.questionIds) {
            if (!answeredIds.has(q._id.toString())) {
                // Treat unanswered as wrong (selectedIndex = -1)
                scoredAnswers.push({ questionId: q._id, selectedIndex: -1, isCorrect: false });
            }
        }

        // Persist
        record.answers = scoredAnswers;
        record.score = score;
        record.completed = true;
        record.completedAt = new Date();
        await record.save();

        // Build detailed results (now includes correct answers & explanations)
        const results = buildResults(record);

        logger.info(`User ${userId} completed daily quiz – score: ${score}/${record.totalQuestions}`);

        return res.json({
            success: true,
            data: {
                score,
                totalQuestions: record.totalQuestions,
                completedAt: record.completedAt,
                results
            }
        });
    } catch (error) {
        logger.error('submitDailyQuiz error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

/**
 * GET /api/daily-quiz/history
 * Returns the user's last 30 daily quiz attempts.
 */
const getQuizHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        const history = await UserDailyQuiz.find({ userId, completed: true })
            .sort({ quizDate: -1 })
            .limit(30)
            .select('quizDate score totalQuestions completedAt')
            .lean();

        return res.json({ success: true, data: history });
    } catch (error) {
        logger.error('getQuizHistory error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ─── Private helpers ────────────────────────────────────────────────────────

/**
 * Strip correct answers from questions before sending to the client.
 */
const sanitizeQuestions = (questions) =>
    questions.map(q => ({
        _id: q._id,
        question: q.question,
        options: q.options,
        category: q.category,
        questionType: q.questionType,
        difficulty: q.difficulty,
        tags: q.tags
        // correctIndex and explanation intentionally omitted
    }));

/**
 * Build full result objects after a quiz is submitted.
 * Requires record.questionIds to be populated.
 */
const buildResults = (record) => {
    const answerMap = {};
    for (const ans of record.answers) {
        answerMap[ans.questionId.toString()] = ans;
    }

    return record.questionIds.map(q => {
        const ans = answerMap[q._id.toString()] || { selectedIndex: -1, isCorrect: false };
        return {
            questionId: q._id,
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            selectedIndex: ans.selectedIndex,
            isCorrect: ans.isCorrect,
            explanation: q.explanation,
            category: q.category,
            questionType: q.questionType,
            difficulty: q.difficulty
        };
    });
};

module.exports = {
    getDailyQuizStatus,
    getDailyQuiz,
    submitDailyQuiz,
    getQuizHistory
};
