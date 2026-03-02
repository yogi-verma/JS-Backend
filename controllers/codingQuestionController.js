const CodingQuestion = require('../models/CodingQuestion');
const logger = require('../logger');

// Get all coding questions (with optional filters)
const getCodingQuestions = async (req, res) => {
    try {
        const { difficulty, category, page = 1, limit = 50 } = req.query;

        const filter = {};
        if (difficulty) filter.difficulty = difficulty;
        if (category) filter.category = category;

        // Don't send solution & hidden test cases in list view
        const questions = await CodingQuestion.find(filter)
            .select('-solution -testCases')
            .sort({ order: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const total = await CodingQuestion.countDocuments(filter);

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
        logger.error('Error fetching coding questions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch coding questions',
            error: error.message
        });
    }
};

// Get a single coding question by ID (for the problem page)
const getCodingQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await CodingQuestion.findById(id);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Coding question not found'
            });
        }

        // Return question without solution; filter hidden test cases
        const questionObj = question.toObject();
        delete questionObj.solution;

        // Only return visible test cases for display; hide the hidden ones
        questionObj.testCases = questionObj.testCases.filter(tc => !tc.isHidden);

        res.json({
            success: true,
            data: questionObj
        });
    } catch (error) {
        logger.error('Error fetching coding question:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch coding question',
            error: error.message
        });
    }
};

// Get a single coding question by slug
const getCodingQuestionBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const question = await CodingQuestion.findOne({ slug });
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Coding question not found'
            });
        }

        const questionObj = question.toObject();
        delete questionObj.solution;
        questionObj.testCases = questionObj.testCases.filter(tc => !tc.isHidden);

        res.json({
            success: true,
            data: questionObj
        });
    } catch (error) {
        logger.error('Error fetching coding question by slug:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch coding question',
            error: error.message
        });
    }
};

// Get coding questions by difficulty
const getCodingQuestionsByDifficulty = async (req, res) => {
    try {
        const { difficulty } = req.params;

        if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid difficulty. Must be Easy, Medium, or Hard'
            });
        }

        const questions = await CodingQuestion.find({ difficulty })
            .select('-solution -testCases')
            .sort({ order: 1 })
            .exec();

        res.json({
            success: true,
            data: questions,
            total: questions.length
        });
    } catch (error) {
        logger.error('Error fetching coding questions by difficulty:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch questions by difficulty',
            error: error.message
        });
    }
};

// Get coding questions stats
const getCodingQuestionsStats = async (req, res) => {
    try {
        const total = await CodingQuestion.countDocuments();
        const byDifficulty = await CodingQuestion.aggregate([
            { $group: { _id: '$difficulty', count: { $sum: 1 } } }
        ]);
        const byCategory = await CodingQuestion.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.json({
            success: true,
            data: {
                total,
                byDifficulty: byDifficulty.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, {}),
                byCategory: byCategory.map(item => ({
                    category: item._id,
                    count: item.count
                }))
            }
        });
    } catch (error) {
        logger.error('Error fetching coding questions stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stats',
            error: error.message
        });
    }
};

// Get categories list
const getCodingCategories = async (req, res) => {
    try {
        const categories = await CodingQuestion.distinct('category');
        res.json({
            success: true,
            data: categories.sort()
        });
    } catch (error) {
        logger.error('Error fetching coding categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
            error: error.message
        });
    }
};

module.exports = {
    getCodingQuestions,
    getCodingQuestionById,
    getCodingQuestionBySlug,
    getCodingQuestionsByDifficulty,
    getCodingQuestionsStats,
    getCodingCategories
};
