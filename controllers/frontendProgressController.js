const UserFrontendProgress = require('../models/UserFrontendProgress');
const FrontendQuestion = require('../models/FrontendQuestion');
const logger = require('../logger');
const redis = require('../redisClient');

const PROGRESS_TTL = 3600; // 1 hour — explicitly invalidated on every toggle

const progressCacheKey = (userId) => `frontend:progress:user=${userId}`;

// Toggle completion status for a frontend question
const toggleFrontendQuestionCompletion = async (req, res) => {
    try {
        const userId = req.user._id;
        const { questionId } = req.params;

        // Verify the question exists
        const question = await FrontendQuestion.findById(questionId);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Frontend question not found'
            });
        }

        // Find existing progress or create new
        let progress = await UserFrontendProgress.findOne({ userId, questionId });

        if (progress) {
            // Toggle isCompleted
            progress.isCompleted = !progress.isCompleted;
            progress.completedAt = progress.isCompleted ? new Date() : null;
            await progress.save();
        } else {
            // Create new record — mark as completed
            progress = await UserFrontendProgress.create({
                userId,
                questionId,
                isCompleted: true,
                completedAt: new Date()
            });
        }

        logger.info(`User ${userId} toggled frontend question ${questionId} to ${progress.isCompleted}`);

        // Invalidate this user's progress cache so next fetch is fresh from DB
        await redis.del(progressCacheKey(userId));
        logger.debug(`Cache invalidated: ${progressCacheKey(userId)}`);

        res.json({
            success: true,
            data: {
                questionId: progress.questionId,
                isCompleted: progress.isCompleted,
                completedAt: progress.completedAt
            }
        });
    } catch (error) {
        logger.error('Error toggling frontend question completion:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update completion status',
            error: error.message
        });
    }
};

// Get all completion progress for the logged-in user
const getUserFrontendProgress = async (req, res) => {
    try {
        const userId = req.user._id;
        const cacheKey = progressCacheKey(userId);

        // 1. Try Redis cache
        const cached = await redis.get(cacheKey);
        if (cached) {
            logger.debug(`Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cached));
        }
        logger.debug(`Cache MISS: ${cacheKey}`);

        // 2. Fetch from MongoDB
        const progress = await UserFrontendProgress.find({
            userId,
            isCompleted: true
        }).select('questionId isCompleted completedAt');

        // Return as a map: { questionId: { isCompleted, completedAt } }
        const progressMap = {};
        progress.forEach(p => {
            progressMap[p.questionId.toString()] = {
                isCompleted: p.isCompleted,
                completedAt: p.completedAt
            };
        });

        const response = {
            success: true,
            data: progressMap,
            completedCount: progress.length
        };

        // 3. Store in Redis
        await redis.set(cacheKey, JSON.stringify(response), PROGRESS_TTL);

        res.json(response);
    } catch (error) {
        logger.error('Error fetching user frontend progress:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch progress',
            error: error.message
        });
    }
};

module.exports = {
    toggleFrontendQuestionCompletion,
    getUserFrontendProgress
};
