const InterviewQuestion = require('../models/InterviewQuestion');
const logger = require('../logger');
const redis = require('../redisClient');

const INTERVIEW_TTL = 3600; // 1 hour — questions rarely change

// Get all interview questions (with optional filters)
const getInterviewQuestions = async (req, res) => {
    try {
        const { difficulty, category, page = 1, limit = 30 } = req.query;
        const cacheKey = `interview:all:diff=${difficulty||'*'}:cat=${category||'*'}:page=${page}:limit=${limit}`;

        // 1. Try Redis cache
        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.debug(`Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cached));
        }
        logger.debug(`Cache MISS: ${cacheKey}`);

        // 2. Fetch from MongoDB
        const filter = {};
        if (difficulty) filter.difficulty = difficulty;
        if (category) filter.category = category;

        const questions = await InterviewQuestion.find(filter)
            .sort({ order: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const total = await InterviewQuestion.countDocuments(filter);

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
        await redis.set(cacheKey, JSON.stringify(response), INTERVIEW_TTL);

        res.json(response);
    } catch (error) {
        logger.error('Error fetching interview questions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch interview questions',
            error: error.message
        });
    }
};

// Get a single interview question by ID
const getInterviewQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const cacheKey = `interview:id=${id}`;

        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.debug(`Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cached));
        }
        logger.debug(`Cache MISS: ${cacheKey}`);

        const question = await InterviewQuestion.findById(id);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Interview question not found'
            });
        }

        const response = { success: true, data: question };
        await redis.set(cacheKey, JSON.stringify(response), INTERVIEW_TTL);

        res.json(response);
    } catch (error) {
        logger.error('Error fetching interview question:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch interview question',
            error: error.message
        });
    }
};

// Get interview questions by difficulty
const getInterviewQuestionsByDifficulty = async (req, res) => {
    try {
        const { difficulty } = req.params;

        if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid difficulty. Must be Easy, Medium, or Hard'
            });
        }

        const cacheKey = `interview:bydiff=${difficulty}`;

        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.debug(`Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cached));
        }
        logger.debug(`Cache MISS: ${cacheKey}`);

        const questions = await InterviewQuestion.find({ difficulty })
            .sort({ order: 1 })
            .exec();

        const response = { success: true, data: questions, total: questions.length };
        await redis.set(cacheKey, JSON.stringify(response), INTERVIEW_TTL);

        res.json(response);
    } catch (error) {
        logger.error('Error fetching questions by difficulty:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch questions by difficulty',
            error: error.message
        });
    }
};

// Get interview questions stats
const getInterviewQuestionsStats = async (req, res) => {
    try {
        const cacheKey = 'interview:stats';

        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.debug(`Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cached));
        }
        logger.debug(`Cache MISS: ${cacheKey}`);

        const total = await InterviewQuestion.countDocuments();
        const byDifficulty = await InterviewQuestion.aggregate([
            { $group: { _id: '$difficulty', count: { $sum: 1 } } }
        ]);
        const byCategory = await InterviewQuestion.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const response = {
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
        };

        await redis.set(cacheKey, JSON.stringify(response), INTERVIEW_TTL);

        res.json(response);
    } catch (error) {
        logger.error('Error fetching interview questions stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stats',
            error: error.message
        });
    }
};

module.exports = {
    getInterviewQuestions,
    getInterviewQuestionById,
    getInterviewQuestionsByDifficulty,
    getInterviewQuestionsStats
};
