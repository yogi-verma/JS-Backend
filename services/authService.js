const logger = require('../utils/logger');

class AuthService {
    static logAuthAttempt(provider, profile) {
        logger.info(`Authentication attempt via ${provider}`, {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value
        });
    }

    static logAuthSuccess(user) {
        logger.info('Authentication successful', {
            userId: user._id,
            email: user.email
        });
    }

    static logAuthError(error) {
        logger.error('Authentication failed', error);
    }

    static logLogout(userId) {
        logger.info('User logged out', { userId });
    }
}

module.exports = AuthService;
