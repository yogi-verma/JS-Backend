const OutputBasedQuestion = require('../models/OutputBasedQuestion');
const logger = require('../logger');

// Get all output-based questions (with optional filters)
const getOutputBasedQuestions = async (req, res) => {
    try {
        const { category, difficulty, page = 1, limit = 50 } = req.query;

        const filter = { isActive: true };
        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;

        const questions = await OutputBasedQuestion.find(filter)
            .sort({ category: 1, createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const total = await OutputBasedQuestion.countDocuments(filter);

        res.json({
            success: true,
            data: questions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        logger.error('Error fetching output-based questions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch output-based questions',
            error: error.message
        });
    }
};

// Get a single output-based question by ID
const getOutputBasedQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await OutputBasedQuestion.findById(id);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Output-based question not found'
            });
        }

        res.json({
            success: true,
            data: question
        });
    } catch (error) {
        logger.error('Error fetching output-based question:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch output-based question',
            error: error.message
        });
    }
};

// Get output-based questions by category
const getOutputBasedQuestionsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { difficulty, page = 1, limit = 50 } = req.query;

        const validCategories = OutputBasedQuestion.schema.path('category').enumValues;
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: `Invalid category. Must be one of: ${validCategories.join(', ')}`
            });
        }

        const filter = { category, isActive: true };
        if (difficulty) filter.difficulty = difficulty;

        const questions = await OutputBasedQuestion.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const total = await OutputBasedQuestion.countDocuments(filter);

        res.json({
            success: true,
            data: questions,
            total,
            category,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        logger.error('Error fetching output-based questions by category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch questions by category',
            error: error.message
        });
    }
};

// Get count of output-based questions grouped by category and difficulty
const getOutputBasedQuestionsStats = async (req, res) => {
    try {
        const stats = await OutputBasedQuestion.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: { category: '$category', difficulty: '$difficulty' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.category': 1, '_id.difficulty': 1 } }
        ]);

        const totalByCategory = await OutputBasedQuestion.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            success: true,
            data: {
                detailed: stats,
                byCategory: totalByCategory,
                total: totalByCategory.reduce((sum, c) => sum + c.count, 0)
            }
        });
    } catch (error) {
        logger.error('Error fetching output-based questions stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stats',
            error: error.message
        });
    }
};

module.exports = {
    getOutputBasedQuestions,
    getOutputBasedQuestionById,
    getOutputBasedQuestionsByCategory,
    getOutputBasedQuestionsStats
};
