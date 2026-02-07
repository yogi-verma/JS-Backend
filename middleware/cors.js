const cors = require('cors');

const corsMiddleware = () => {
    const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean);
    
    return cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) !== -1) {
                return callback(null, true);
            }
            return callback(new Error('CORS origin not allowed'));
        },
        credentials: true
    });
};

module.exports = corsMiddleware;
