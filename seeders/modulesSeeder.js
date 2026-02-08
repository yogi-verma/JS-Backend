const mongoose = require('mongoose');
const Module = require('../models/Module');
const logger = require('../logger');

const modulesData = [
    {
        name: 'javascript',
        title: 'JavaScript Fundamentals',
        description: 'Master the core concepts of JavaScript programming from basics to advanced topics. Learn variables, functions, objects, arrays, async programming, and modern ES6+ features.',
        icon: '🟨',
        order: 1,
        isPublished: true,
        estimatedDuration: 40,
        difficulty: 'beginner',
        tags: ['javascript', 'programming', 'web-development', 'es6', 'async']
    },
    {
        name: 'react',
        title: 'React Development',
        description: 'Build modern web applications with React. Learn components, hooks, state management, routing, and best practices for creating scalable React applications.',
        icon: '⚛️',
        order: 2,
        isPublished: true,
        estimatedDuration: 50,
        difficulty: 'intermediate',
        prerequisites: [], // Will be set after JavaScript module is created
        tags: ['react', 'jsx', 'hooks', 'components', 'frontend']
    },
    {
        name: 'redux',
        title: 'Redux State Management',
        description: 'Master Redux for predictable state management in JavaScript applications. Learn store, actions, reducers, middleware, and modern Redux Toolkit.',
        icon: '🔄',
        order: 3,
        isPublished: true,
        estimatedDuration: 30,
        difficulty: 'intermediate',
        prerequisites: [], // Will be set after React module is created
        tags: ['redux', 'state-management', 'redux-toolkit', 'middleware']
    },
    {
        name: 'backend',
        title: 'Backend Development',
        description: 'Learn server-side development with Node.js and Express. Build RESTful APIs, work with databases, implement authentication, and deploy production-ready applications.',
        icon: '⚙️',
        order: 4,
        isPublished: true,
        estimatedDuration: 60,
        difficulty: 'advanced',
        prerequisites: [], // Will be set after JavaScript module is created
        tags: ['nodejs', 'express', 'api', 'database', 'authentication']
    }
];

const seedModules = async () => {
    try {
        // Clear existing modules
        await Module.deleteMany({});
        logger.info('Cleared existing modules');

        // Create modules and set prerequisites
        const createdModules = [];
        
        for (const moduleData of modulesData) {
            const module = new Module(moduleData);
            await module.save();
            createdModules.push(module);
            logger.info(`Created module: ${module.name}`);
        }

        // Set prerequisites after all modules are created
        const reactModule = createdModules.find(m => m.name === 'react');
        const reduxModule = createdModules.find(m => m.name === 'redux');
        const backendModule = createdModules.find(m => m.name === 'backend');
        const jsModule = createdModules.find(m => m.name === 'javascript');

        if (reactModule && jsModule) {
            reactModule.prerequisites = [jsModule._id];
            await reactModule.save();
            logger.info('Set JavaScript as prerequisite for React');
        }

        if (reduxModule && reactModule) {
            reduxModule.prerequisites = [reactModule._id];
            await reduxModule.save();
            logger.info('Set React as prerequisite for Redux');
        }

        if (backendModule && jsModule) {
            backendModule.prerequisites = [jsModule._id];
            await backendModule.save();
            logger.info('Set JavaScript as prerequisite for Backend');
        }

        logger.info('Module seeding completed successfully');
        return createdModules;

    } catch (error) {
        logger.error('Error seeding modules:', error);
        throw error;
    }
};

// Run seeder if called directly
if (require.main === module) {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/learning-platform')
        .then(async () => {
            logger.info('Connected to MongoDB for seeding');
            await seedModules();
            logger.info('Seeding completed. Exiting...');
            process.exit(0);
        })
        .catch((error) => {
            logger.error('MongoDB connection error:', error);
            process.exit(1);
        });
}

module.exports = { seedModules };
