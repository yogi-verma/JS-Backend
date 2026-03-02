const UserCodingProgress = require('../models/UserCodingProgress');
const CodingQuestion = require('../models/CodingQuestion');
const { executeCode, validateCode } = require('../utils/codeExecutor');
const logger = require('../logger');

/**
 * RUN test cases — execute user code without saving progress.
 * Like the "Run" button on LeetCode; only runs visible test cases.
 */
const runTestCases = async (req, res) => {
    try {
        const { questionId, code } = req.body;

        if (!questionId || !code) {
            return res.status(400).json({
                success: false,
                message: 'questionId and code are required'
            });
        }

        // Validate code safety
        const validation = validateCode(code);
        if (!validation.safe) {
            return res.status(400).json({
                success: false,
                message: validation.reason
            });
        }

        // Fetch the question
        const question = await CodingQuestion.findById(questionId);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Coding question not found'
            });
        }

        // Run only visible test cases (not hidden)
        const visibleTestCases = question.testCases.filter(tc => !tc.isHidden);

        const executionResult = executeCode(
            code,
            question.functionName,
            visibleTestCases,
            5000
        );

        res.json({
            success: true,
            data: {
                results: executionResult.results,
                allPassed: executionResult.allPassed,
                totalTests: executionResult.totalTests,
                passedTests: executionResult.passedTests,
                totalExecutionTime: executionResult.totalExecutionTime
            }
        });
    } catch (error) {
        logger.error('Error running test cases:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to run test cases',
            error: error.message
        });
    }
};

/**
 * SUBMIT solution — run code against ALL test cases (including hidden),
 * save progress, and mark as solved if all pass.
 * Like the "Submit" button on LeetCode.
 */
const submitSolution = async (req, res) => {
    try {
        const userId = req.user._id;
        const { questionId, code } = req.body;

        if (!questionId || !code) {
            return res.status(400).json({
                success: false,
                message: 'questionId and code are required'
            });
        }

        // Validate code safety
        const validation = validateCode(code);
        if (!validation.safe) {
            return res.status(400).json({
                success: false,
                message: validation.reason
            });
        }

        // Fetch the question with all test cases
        const question = await CodingQuestion.findById(questionId);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Coding question not found'
            });
        }

        // Execute against ALL test cases (including hidden)
        const executionResult = executeCode(
            code,
            question.functionName,
            question.testCases,
            5000
        );

        // Update or create progress
        let progress = await UserCodingProgress.findOne({ userId, questionId });

        // Build submission record
        const submissionRecord = {
            code,
            accepted: executionResult.allPassed,
            passedTests: executionResult.passedTests,
            totalTests: executionResult.totalTests,
            totalExecutionTime: executionResult.totalExecutionTime,
            submittedAt: new Date()
        };

        if (progress) {
            progress.submittedCode = code;
            progress.attempts += 1;
            progress.lastAttemptAt = new Date();
            progress.lastTestResults = executionResult.results;
            progress.submissions.push(submissionRecord);

            // Only mark as solved if all test cases pass
            if (executionResult.allPassed && !progress.isSolved) {
                progress.isSolved = true;
                progress.solvedAt = new Date();
            }

            await progress.save();
        } else {
            progress = await UserCodingProgress.create({
                userId,
                questionId,
                submittedCode: code,
                attempts: 1,
                lastAttemptAt: new Date(),
                lastTestResults: executionResult.results,
                isSolved: executionResult.allPassed,
                solvedAt: executionResult.allPassed ? new Date() : null,
                submissions: [submissionRecord]
            });
        }

        logger.info(`User ${userId} submitted solution for question ${questionId} — ${executionResult.allPassed ? 'ACCEPTED' : 'FAILED'} (${executionResult.passedTests}/${executionResult.totalTests})`);

        // For hidden test cases: show full details when failed so user can debug
        const safeResults = executionResult.results.map((r, idx) => {
            const testCase = question.testCases[idx];
            if (testCase && testCase.isHidden) {
                if (!r.passed) {
                    // Show full details for failed hidden test cases
                    return {
                        testCaseIndex: r.testCaseIndex,
                        passed: r.passed,
                        description: r.description || `Hidden Test Case ${idx + 1}`,
                        executionTime: r.executionTime,
                        isHidden: true,
                        error: r.error || null,
                        errorType: r.errorType || null,
                        input: testCase.input,
                        expectedOutput: testCase.expectedOutput,
                        actualOutput: r.actualOutput
                    };
                }
                return {
                    testCaseIndex: r.testCaseIndex,
                    passed: r.passed,
                    description: r.description || `Hidden Test Case ${idx + 1}`,
                    executionTime: r.executionTime,
                    isHidden: true,
                    error: null
                };
            }
            return { ...r, isHidden: false };
        });

        res.json({
            success: true,
            data: {
                accepted: executionResult.allPassed,
                results: safeResults,
                totalTests: executionResult.totalTests,
                passedTests: executionResult.passedTests,
                totalExecutionTime: executionResult.totalExecutionTime,
                attempts: progress.attempts,
                isSolved: progress.isSolved
            }
        });
    } catch (error) {
        logger.error('Error submitting solution:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit solution',
            error: error.message
        });
    }
};

/**
 * Get all coding progress for the logged-in user.
 * Returns a map of { questionId: { isSolved, attempts, solvedAt } }
 */
const getUserProgress = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get all existing question IDs to filter out stale progress
        const existingQuestionIds = (await CodingQuestion.find().select('_id')).map(q => q._id.toString());
        const existingSet = new Set(existingQuestionIds);

        const progress = await UserCodingProgress.find({ userId })
            .select('questionId isSolved attempts solvedAt lastAttemptAt');

        const progressMap = {};
        progress.forEach(p => {
            const qId = p.questionId.toString();
            // Only include progress for questions that still exist
            if (existingSet.has(qId)) {
                progressMap[qId] = {
                    isSolved: p.isSolved,
                    attempts: p.attempts,
                    solvedAt: p.solvedAt,
                    lastAttemptAt: p.lastAttemptAt
                };
            }
        });

        const solvedCount = Object.values(progressMap).filter(p => p.isSolved).length;
        const attemptedCount = Object.keys(progressMap).length;

        res.json({
            success: true,
            data: progressMap,
            solvedCount,
            attemptedCount
        });
    } catch (error) {
        logger.error('Error fetching user coding progress:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch progress',
            error: error.message
        });
    }
};

/**
 * Get user's last submitted code for a specific question.
 * Used to restore the editor state when revisiting a question.
 */
const getUserSubmission = async (req, res) => {
    try {
        const userId = req.user._id;
        const { questionId } = req.params;

        const progress = await UserCodingProgress.findOne({ userId, questionId })
            .select('submittedCode isSolved attempts lastAttemptAt lastTestResults');

        if (!progress) {
            return res.json({
                success: true,
                data: null,
                message: 'No submission found for this question'
            });
        }

        res.json({
            success: true,
            data: {
                submittedCode: progress.submittedCode,
                isSolved: progress.isSolved,
                attempts: progress.attempts,
                lastAttemptAt: progress.lastAttemptAt,
                lastTestResults: progress.lastTestResults
            }
        });
    } catch (error) {
        logger.error('Error fetching user submission:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch submission',
            error: error.message
        });
    }
};

/**
 * Get user's coding stats — overall progress summary.
 */
const getUserCodingStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalQuestions = await CodingQuestion.countDocuments();
        
        // Get all existing question IDs to filter out stale progress
        const existingQuestionIds = (await CodingQuestion.find().select('_id')).map(q => q._id.toString());
        const existingSet = new Set(existingQuestionIds);

        const progress = await UserCodingProgress.find({ userId });
        // Filter to only progress for currently existing questions
        const validProgress = progress.filter(p => existingSet.has(p.questionId.toString()));

        const solvedCount = validProgress.filter(p => p.isSolved).length;
        const attemptedCount = validProgress.length;
        const totalAttempts = validProgress.reduce((sum, p) => sum + p.attempts, 0);

        // Count solved by difficulty
        const solvedQuestionIds = validProgress.filter(p => p.isSolved).map(p => p.questionId);
        const solvedQuestions = await CodingQuestion.find({
            _id: { $in: solvedQuestionIds }
        }).select('difficulty');

        const solvedByDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
        solvedQuestions.forEach(q => {
            solvedByDifficulty[q.difficulty]++;
        });

        // Total by difficulty
        const totalByDifficulty = await CodingQuestion.aggregate([
            { $group: { _id: '$difficulty', count: { $sum: 1 } } }
        ]);
        const totalByDiffMap = totalByDifficulty.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, { Easy: 0, Medium: 0, Hard: 0 });

        res.json({
            success: true,
            data: {
                totalQuestions,
                solvedCount,
                attemptedCount,
                totalAttempts,
                solvedByDifficulty,
                totalByDifficulty: totalByDiffMap,
                completionPercentage: totalQuestions > 0
                    ? Math.round((solvedCount / totalQuestions) * 100)
                    : 0
            }
        });
    } catch (error) {
        logger.error('Error fetching user coding stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch coding stats',
            error: error.message
        });
    }
};

/**
 * Reset user's progress for a specific question.
 */
const resetQuestionProgress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { questionId } = req.params;

        const result = await UserCodingProgress.findOneAndDelete({ userId, questionId });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'No progress found for this question'
            });
        }

        logger.info(`User ${userId} reset progress for question ${questionId}`);

        res.json({
            success: true,
            message: 'Progress reset successfully'
        });
    } catch (error) {
        logger.error('Error resetting question progress:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reset progress',
            error: error.message
        });
    }
};

/**
 * Get all submissions for a specific question by the logged-in user.
 * Returns the submission history (code, result, timestamp) sorted newest first.
 */
const getSubmissions = async (req, res) => {
    try {
        const userId = req.user._id;
        const { questionId } = req.params;

        const progress = await UserCodingProgress.findOne({ userId, questionId })
            .select('submissions');

        if (!progress || !progress.submissions || progress.submissions.length === 0) {
            return res.json({
                success: true,
                data: [],
                message: 'No submissions found for this question'
            });
        }

        // Return newest first
        const submissions = [...progress.submissions]
            .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
            .map((s, idx, arr) => ({
                id: s._id,
                number: arr.length - idx,
                code: s.code,
                accepted: s.accepted,
                passedTests: s.passedTests,
                totalTests: s.totalTests,
                totalExecutionTime: s.totalExecutionTime,
                submittedAt: s.submittedAt
            }));

        res.json({
            success: true,
            data: submissions
        });
    } catch (error) {
        logger.error('Error fetching submissions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch submissions',
            error: error.message
        });
    }
};

module.exports = {
    runTestCases,
    submitSolution,
    getUserProgress,
    getUserSubmission,
    getUserCodingStats,
    resetQuestionProgress,
    getSubmissions
};
