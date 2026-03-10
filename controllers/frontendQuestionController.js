const FrontendQuestion = require('../models/FrontendQuestion');
const logger = require('../logger');
const redis = require('../redisClient');

const FRONTEND_TTL = 3600; // 1 hour — questions rarely change

// Get all frontend questions (with optional filters)
const getFrontendQuestions = async (req, res) => {
    try {
        const { category, page = 1, limit = 50 } = req.query;
        const cacheKey = `frontend:all:cat=${category||'*'}:page=${page}:limit=${limit}`;

        // 1. Try Redis cache
        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.debug(`Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cached));
        }
        logger.debug(`Cache MISS: ${cacheKey}`);

        // 2. Fetch from MongoDB
        const filter = {};
        if (category) filter.category = category;

        const questions = await FrontendQuestion.find(filter)
            .sort({ category: 1, order: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const total = await FrontendQuestion.countDocuments(filter);

        const response = {
            success: true,
            data: questions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        };

        // 3. Store in Redis
        await redis.set(cacheKey, JSON.stringify(response), FRONTEND_TTL);

        res.json(response);
    } catch (error) {
        logger.error('Error fetching frontend questions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch frontend questions',
            error: error.message
        });
    }
};

// Get a single frontend question by ID
const getFrontendQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const cacheKey = `frontend:id=${id}`;

        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.debug(`Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cached));
        }
        logger.debug(`Cache MISS: ${cacheKey}`);

        const question = await FrontendQuestion.findById(id);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Frontend question not found'
            });
        }

        const response = { success: true, data: question };
        await redis.set(cacheKey, JSON.stringify(response), FRONTEND_TTL);

        res.json(response);
    } catch (error) {
        logger.error('Error fetching frontend question:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch frontend question',
            error: error.message
        });
    }
};

// Get frontend questions by category
const getFrontendQuestionsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        // Decode URI-encoded category (e.g. "HTML%20%26%20WEB%20FUNDAMENTALS")
        const decodedCategory = decodeURIComponent(category);

        const validCategories = FrontendQuestion.schema.path('category').enumValues;
        if (!validCategories.includes(decodedCategory)) {
            return res.status(400).json({
                success: false,
                message: `Invalid category. Must be one of: ${validCategories.join(', ')}`
            });
        }

        const cacheKey = `frontend:bycat=${decodedCategory}`;

        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.debug(`Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cached));
        }
        logger.debug(`Cache MISS: ${cacheKey}`);

        const questions = await FrontendQuestion.find({ category: decodedCategory })
            .sort({ order: 1 })
            .exec();

        const response = {
            success: true,
            data: questions,
            total: questions.length,
            category: decodedCategory
        };

        await redis.set(cacheKey, JSON.stringify(response), FRONTEND_TTL);

        res.json(response);
    } catch (error) {
        logger.error('Error fetching questions by category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch questions by category',
            error: error.message
        });
    }
};

// Get frontend questions stats
const getFrontendQuestionsStats = async (req, res) => {
    try {
        const cacheKey = 'frontend:stats';

        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.debug(`Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cached));
        }
        logger.debug(`Cache MISS: ${cacheKey}`);

        const total = await FrontendQuestion.countDocuments();

        const byCategory = await FrontendQuestion.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        const validCategories = FrontendQuestion.schema.path('category').enumValues;

        const response = {
            success: true,
            data: {
                total,
                totalCategories: validCategories.length,
                seededCategories: byCategory.length,
                byCategory: byCategory.map(item => ({
                    category: item._id,
                    count: item.count
                })),
                allCategories: validCategories
            }
        };

        await redis.set(cacheKey, JSON.stringify(response), FRONTEND_TTL);

        res.json(response);
    } catch (error) {
        logger.error('Error fetching frontend questions stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch frontend questions stats',
            error: error.message
        });
    }
};

// Get list of all categories (with counts)
const getCategories = async (req, res) => {
    try {
        const cacheKey = 'frontend:categories';

        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.debug(`Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cached));
        }
        logger.debug(`Cache MISS: ${cacheKey}`);

        const categories = await FrontendQuestion.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        const response = {
            success: true,
            data: categories.map(item => ({
                category: item._id,
                count: item.count
            }))
        };

        await redis.set(cacheKey, JSON.stringify(response), FRONTEND_TTL);

        res.json(response);
    } catch (error) {
        logger.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
            error: error.message
        });
    }
};

module.exports = {
    getFrontendQuestions,
    getFrontendQuestionById,
    getFrontendQuestionsByCategory,
    getFrontendQuestionsStats,
    getCategories
};
