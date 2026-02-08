const express = require('express');
const router = express.Router();
const {
    getAllModules,
    getModuleById,
    getModuleByName,
    createModule,
    updateModule,
    deleteModule,
    getModulesWithStats
} = require('../controllers/moduleController');

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid module ID format'
        });
    }
    next();
};

// GET /api/modules - Get all modules with pagination and filtering
router.get('/', getAllModules);

// GET /api/modules/stats - Get modules with statistics (lesson count, etc.)
router.get('/stats', getModulesWithStats);

// GET /api/modules/:id - Get module by ID
router.get('/:id', validateObjectId, getModuleById);

// GET /api/modules/name/:name - Get module by name
router.get('/name/:name', getModuleByName);

// POST /api/modules - Create new module (protected route)
router.post('/', createModule);

// PUT /api/modules/:id - Update module (protected route)
router.put('/:id', validateObjectId, updateModule);

// DELETE /api/modules/:id - Delete module (protected route)
router.delete('/:id', validateObjectId, deleteModule);

module.exports = router;
