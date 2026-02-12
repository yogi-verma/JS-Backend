const Module = require('../models/Module');
const logger = require('../logger');
const { generateKey, cacheWrapper, invalidateByPattern } = require('../cache');

// Get all modules
const getAllModules = async (req, res) => {
    const startTime = process.hrtime.bigint();
    try {
        const { published = 'true', page = 1, limit = 10 } = req.query;
        
        const filter = published === 'true' ? { isPublished: true } : {};
        
        // Generate cache key
        const cacheKey = generateKey('modules', 'all', published, page, limit);
        
        // Try to get from cache
        const { data: cachedResult, fromCache } = await cacheWrapper(
            cacheKey,
            300, // 5 minutes TTL
            async () => {
                const modules = await Module.find(filter)
                    .sort({ order: 1 })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .populate('prerequisites', 'name title')
                    .exec();

                const total = await Module.countDocuments(filter);
                
                return { modules, total };
            }
        );
        
        const { modules, total } = cachedResult;

        const durationMs = Number(process.hrtime.bigint() - startTime) / 1e6;
        res.set('X-Response-Time', `${durationMs.toFixed(2)}ms`);
        res.set('X-Cache', fromCache ? 'HIT' : 'MISS');

        res.json({
            success: true,
            data: modules,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            },
            responseTimeMs: Number(durationMs.toFixed(2)),
            cached: fromCache
        });
    } catch (error) {
        logger.error('Error fetching modules:', error);
        const durationMs = Number(process.hrtime.bigint() - startTime) / 1e6;
        res.set('X-Response-Time', `${durationMs.toFixed(2)}ms`);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch modules',
            error: error.message,
            responseTimeMs: Number(durationMs.toFixed(2))
        });
    }
};

// Get module by ID
const getModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Generate cache key
        const cacheKey = generateKey('modules', 'id', id);
        
        // Try to get from cache
        const { data: module, fromCache } = await cacheWrapper(
            cacheKey,
            600, // 10 minutes TTL
            async () => {
                return await Module.findById(id)
                    .populate('prerequisites', 'name title description')
                    .exec();
            }
        );

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        res.set('X-Cache', fromCache ? 'HIT' : 'MISS');
        res.json({
            success: true,
            data: module,
            cached: fromCache
        });
    } catch (error) {
        logger.error('Error fetching module:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch module',
            error: error.message
        });
    }
};

// Get module by name
const getModuleByName = async (req, res) => {
    try {
        const { name } = req.params;
        
        // Generate cache key
        const cacheKey = generateKey('modules', 'name', name);
        
        // Try to get from cache
        const { data: module, fromCache } = await cacheWrapper(
            cacheKey,
            600, // 10 minutes TTL
            async () => {
                return await Module.findOne({ name })
                    .populate('prerequisites', 'name title description')
                    .exec();
            }
        );

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        res.set('X-Cache', fromCache ? 'HIT' : 'MISS');
        res.json({
            success: true,
            data: module,
            cached: fromCache
        });
    } catch (error) {
        logger.error('Error fetching module by name:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch module',
            error: error.message
        });
    }
};

// Create new module
const createModule = async (req, res) => {
    try {
        const moduleData = req.body;
        
        // Check if module name already exists
        const existingModule = await Module.findOne({ name: moduleData.name });
        if (existingModule) {
            return res.status(400).json({
                success: false,
                message: 'Module with this name already exists'
            });
        }

        // Check if order already exists
        const existingOrder = await Module.findOne({ order: moduleData.order });
        if (existingOrder) {
            return res.status(400).json({
                success: false,
                message: 'Module order must be unique'
            });
        }

        const module = new Module(moduleData);
        await module.save();

        // Invalidate all module caches
        invalidateByPattern('modules');

        logger.info(`New module created: ${module.name} by user ${req.user?.displayName || 'Anonymous'}`);

        res.status(201).json({
            success: true,
            message: 'Module created successfully',
            data: module
        });
    } catch (error) {
        logger.error('Error creating module:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create module',
            error: error.message
        });
    }
};

// Update module
const updateModule = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const module = await Module.findById(id);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        // Check if order is being changed and if new order already exists
        if (updateData.order && updateData.order !== module.order) {
            const existingOrder = await Module.findOne({ 
                order: updateData.order,
                _id: { $ne: id }
            });
            if (existingOrder) {
                return res.status(400).json({
                    success: false,
                    message: 'Module order must be unique'
                });
            }
        }

        // Check if name is being changed and if new name already exists
        if (updateData.name && updateData.name !== module.name) {
            const existingName = await Module.findOne({ 
                name: updateData.name,
                _id: { $ne: id }
            });
            if (existingName) {
                return res.status(400).json({
                    success: false,
                    message: 'Module with this name already exists'
                });
            }
        }

        Object.assign(module, updateData);
        await module.save();

        // Invalidate all module caches
        invalidateByPattern('modules');

        logger.info(`Module updated: ${module.name} by user ${req.user?.displayName || 'Anonymous'}`);

        res.json({
            success: true,
            message: 'Module updated successfully',
            data: module
        });
    } catch (error) {
        logger.error('Error updating module:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update module',
            error: error.message
        });
    }
};

// Delete module
const deleteModule = async (req, res) => {
    try {
        const { id } = req.params;

        const module = await Module.findById(id);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        // Check if this module is a prerequisite for other modules
        const dependentModules = await Module.find({ prerequisites: id });
        if (dependentModules.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete module that is a prerequisite for other modules',
                dependentModules: dependentModules.map(m => ({ id: m._id, name: m.name }))
            });
        }

        await Module.findByIdAndDelete(id);

        // Invalidate all module caches
        invalidateByPattern('modules');

        logger.info(`Module deleted: ${module.name} by user ${req.user?.displayName || 'Anonymous'}`);

        res.json({
            success: true,
            message: 'Module deleted successfully'
        });
    } catch (error) {
        logger.error('Error deleting module:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete module',
            error: error.message
        });
    }
};

// Get modules with lesson count
const getModulesWithStats = async (req, res) => {
    try {
        // Generate cache key
        const cacheKey = generateKey('modules', 'stats');
        
        // Try to get from cache
        const { data: modulesWithStats, fromCache } = await cacheWrapper(
            cacheKey,
            300, // 5 minutes TTL
            async () => {
                const modules = await Module.find({ isPublished: true })
                    .sort({ order: 1 })
                    .populate('prerequisites', 'name title')
                    .exec();

                // Get lesson counts for each module
                return await Promise.all(
                    modules.map(async (module) => {
                        const lessonCount = await module.getLessonCount();
                        return {
                            ...module.toObject(),
                            lessonCount
                        };
                    })
                );
            }
        );

        res.set('X-Cache', fromCache ? 'HIT' : 'MISS');
        res.json({
            success: true,
            data: modulesWithStats,
            cached: fromCache
        });
    } catch (error) {
        logger.error('Error fetching modules with stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch modules with stats',
            error: error.message
        });
    }
};

module.exports = {
    getAllModules,
    getModuleById,
    getModuleByName,
    createModule,
    updateModule,
    deleteModule,
    getModulesWithStats
};
