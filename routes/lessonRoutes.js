const express = require('express');
const router = express.Router();
const {
    getLessonsByModule,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
    getLessonsWithStats
} = require('../controllers/lessonController');

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid lesson ID format'
        });
    }
    next();
};

// Middleware to validate ModuleId
const validateModuleId = (req, res, next) => {
    const { moduleId } = req.params;
    if (!moduleId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid module ID format'
        });
    }
    next();
};

// GET /api/lessons/module/:moduleId - Get all lessons for a specific module
router.get('/module/:moduleId', validateModuleId, getLessonsByModule);

// GET /api/lessons/module/:moduleId/stats - Get lessons with stats for a module
router.get('/module/:moduleId/stats', validateModuleId, getLessonsWithStats);

// GET /api/lessons/:id - Get lesson by ID
router.get('/:id', validateObjectId, getLessonById);

// POST /api/lessons - Create new lesson (protected route)
router.post('/', createLesson);

// PUT /api/lessons/:id - Update lesson (protected route)
router.put('/:id', validateObjectId, updateLesson);

// DELETE /api/lessons/:id - Delete lesson (protected route)
router.delete('/:id', validateObjectId, deleteLesson);

module.exports = router;
