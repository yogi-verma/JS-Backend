const logger = require('../utils/logger');

const requiredEnvVars = [
    'MONGO_URI',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'SESSION_SECRET'
];

const optionalEnvVars = [
    'CLIENT_URL',
    'OAUTH_CALLBACK_URL',
    'NODE_ENV',
    'PORT'
];

const validateEnv = () => {
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        logger.error('Missing required environment variables:', missingVars);
        logger.error('Please set the following environment variables:');
        missingVars.forEach(varName => {
            logger.error(`${varName}=your_value_here`);
        });
        process.exit(1);
    }
    
    logger.info('Environment variables validated successfully');
    
    // Log optional vars that are set (for debugging)
    const setOptionalVars = optionalEnvVars.filter(varName => process.env[varName]);
    if (setOptionalVars.length > 0) {
        logger.debug('Optional environment variables set:', setOptionalVars);
    }
};

module.exports = { validateEnv };
