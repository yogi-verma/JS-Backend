const Lesson = require('../models/Lesson');
const Module = require('../models/Module');
const logger = require('../logger');
const { generateKey, cacheWrapper, invalidateByPattern } = require('../cache');

// Get all lessons for a module
const getLessonsByModule = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const { published = 'true', page = 1, limit = 10 } = req.query;
        
        // Validate module exists
        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }
        
        // Generate cache key
        const cacheKey = generateKey('lessons', 'module', moduleId, published, page, limit);
        
        // Try to get from cache
        const { data: cachedResult, fromCache } = await cacheWrapper(
            cacheKey,
            300, // 5 minutes TTL
            async () => {
                const filter = { 
                    moduleId,
                    ...(published === 'true' && { isPublished: true })
                };
                
                const lessons = await Lesson.find(filter)
                    .sort({ order: 1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .populate('prerequisites', 'title order')
                    .exec();

                const total = await Lesson.countDocuments(filter);
                
                return { lessons, total };
            }
        );
        
        const { lessons, total } = cachedResult;

        res.set('X-Cache', fromCache ? 'HIT' : 'MISS');
        res.json({
            success: true,
            data: lessons,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            },
            cached: fromCache
        });
    } catch (error) {
        logger.error('Error fetching lessons:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch lessons',
            error: error.message
        });
    }
};

// Get lesson by ID
const getLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Generate cache key
        const cacheKey = generateKey('lessons', 'id', id);
        
        // Try to get from cache
        const { data: lesson, fromCache } = await cacheWrapper(
            cacheKey,
            600, // 10 minutes TTL
            async () => {
                return await Lesson.findById(id)
                    .populate('moduleId', 'name title')
                    .populate('prerequisites', 'title order')
                    .exec();
            }
        );

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        res.set('X-Cache', fromCache ? 'HIT' : 'MISS');
        res.json({
            success: true,
            data: lesson,
            cached: fromCache
        });
    } catch (error) {
        logger.error('Error fetching lesson:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch lesson',
            error: error.message
        });
    }
};

// Create new lesson
const createLesson = async (req, res) => {
    try {
        const lessonData = req.body;
        
        // Validate module exists
        const module = await Module.findById(lessonData.moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }
        
        // Check if lesson order already exists in this module
        const existingOrder = await Lesson.findOne({ 
            moduleId: lessonData.moduleId, 
            order: lessonData.order 
        });
        if (existingOrder) {
            return res.status(400).json({
                success: false,
                message: 'Lesson order must be unique within this module'
            });
        }

        const lesson = new Lesson(lessonData);
        await lesson.save();

        // Invalidate lesson caches
        invalidateByPattern('lessons');

        logger.info(`New lesson created: ${lesson.title} in module ${module.name} by user ${req.user?.displayName || 'Anonymous'}`);

        res.status(201).json({
            success: true,
            message: 'Lesson created successfully',
            data: lesson
        });
    } catch (error) {
        logger.error('Error creating lesson:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create lesson',
            error: error.message
        });
    }
};

// Update lesson
const updateLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const lesson = await Lesson.findById(id);
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        // Check if order is being changed and if new order already exists in this module
        if (updateData.order && updateData.order !== lesson.order) {
            const existingOrder = await Lesson.findOne({ 
                moduleId: lesson.moduleId,
                order: updateData.order,
                _id: { $ne: id }
            });
            if (existingOrder) {
                return res.status(400).json({
                    success: false,
                    message: 'Lesson order must be unique within this module'
                });
            }
        }

        // Validate new module if moduleId is being changed
        if (updateData.moduleId && updateData.moduleId !== lesson.moduleId.toString()) {
            const newModule = await Module.findById(updateData.moduleId);
            if (!newModule) {
                return res.status(404).json({
                    success: false,
                    message: 'New module not found'
                });
            }
            
            // Check if order already exists in new module
            const existingOrderInNewModule = await Lesson.findOne({ 
                moduleId: updateData.moduleId,
                order: updateData.order || lesson.order
            });
            if (existingOrderInNewModule) {
                return res.status(400).json({
                    success: false,
                    message: 'Lesson order must be unique within the target module'
                });
            }
        }

        Object.assign(lesson, updateData);
        await lesson.save();

        // Invalidate lesson caches
        invalidateByPattern('lessons');

        logger.info(`Lesson updated: ${lesson.title} by user ${req.user?.displayName || 'Anonymous'}`);

        res.json({
            success: true,
            message: 'Lesson updated successfully',
            data: lesson
        });
    } catch (error) {
        logger.error('Error updating lesson:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update lesson',
            error: error.message
        });
    }
};

// Delete lesson
const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;

        const lesson = await Lesson.findById(id);
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        // Check if this lesson is a prerequisite for other lessons
        const dependentLessons = await Lesson.find({ prerequisites: id });
        if (dependentLessons.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete lesson that is a prerequisite for other lessons',
                dependentLessons: dependentLessons.map(l => ({ id: l._id, title: l.title }))
            });
        }

        await Lesson.findByIdAndDelete(id);

        // Invalidate lesson caches
        invalidateByPattern('lessons');

        logger.info(`Lesson deleted: ${lesson.title} by user ${req.user?.displayName || 'Anonymous'}`);

        res.json({
            success: true,
            message: 'Lesson deleted successfully'
        });
    } catch (error) {
        logger.error('Error deleting lesson:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete lesson',
            error: error.message
        });
    }
};

// Get lessons with stats for a module
const getLessonsWithStats = async (req, res) => {
    try {
        const { moduleId } = req.params;
        
        // Validate module exists
        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        // Generate cache key
        const cacheKey = generateKey('lessons', 'stats', moduleId);
        
        // Try to get from cache
        const { data: result, fromCache } = await cacheWrapper(
            cacheKey,
            300, // 5 minutes TTL
            async () => {
                const lessons = await Lesson.find({ 
                    moduleId, 
                    isPublished: true 
                })
                .sort({ order: 1 })
                .populate('prerequisites', 'title order')
                .exec();

                // Calculate stats
                const totalDuration = lessons.reduce((sum, lesson) => sum + lesson.estimatedDuration, 0);
                const lessonsByType = lessons.reduce((acc, lesson) => {
                    acc[lesson.type] = (acc[lesson.type] || 0) + 1;
                    return acc;
                }, {});
                
                return {
                    lessons,
                    stats: {
                        totalLessons: lessons.length,
                        totalDuration, // in minutes
                        totalDurationHours: Math.round(totalDuration / 60 * 10) / 10,
                        lessonsByType,
                        averageDuration: lessons.length > 0 ? Math.round(totalDuration / lessons.length) : 0
                    }
                };
            }
        );

        res.set('X-Cache', fromCache ? 'HIT' : 'MISS');
        res.json({
            success: true,
            data: result,
            cached: fromCache
        });
    } catch (error) {
        logger.error('Error fetching lessons with stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch lessons with stats',
            error: error.message
        });
    }
};

module.exports = {
    getLessonsByModule,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
    getLessonsWithStats
};
