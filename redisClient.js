const Redis = require('ioredis');
const logger = require('./logger');

let client = null;

if (process.env.REDIS_URL) {
    client = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        lazyConnect: false,
        connectTimeout: 10000,
        retryStrategy(times) {
            // Retry up to 3 times with increasing delay, then give up
            if (times > 3) return null;
            return Math.min(times * 500, 2000);
        },
    });

    client.on('connect', () => logger.info('Redis: connected'));
    client.on('ready', () => logger.info('Redis: ready'));
    client.on('error', (err) => logger.error('Redis error:', err.message));
    client.on('close', () => logger.warn('Redis: connection closed'));
    client.on('reconnecting', () => logger.info('Redis: reconnecting...'));
} else {
    logger.warn('REDIS_URL not set — Redis caching is disabled, falling back to no cache');
}

/**
 * Get a value from Redis. Returns null if Redis is disabled or key not found.
 * @param {string} key
 * @returns {Promise<string|null>}
 */
const get = async (key) => {
    if (!client) return null;
    try {
        return await client.get(key);
    } catch (err) {
        logger.error(`Redis GET error (key: ${key}):`, err.message);
        return null;
    }
};

/**
 * Set a value in Redis with an optional TTL in seconds.
 * @param {string} key
 * @param {string} value
 * @param {number} ttlSeconds  default 3600 (1 hour)
 */
const set = async (key, value, ttlSeconds = 3600) => {
    if (!client) return;
    try {
        await client.set(key, value, 'EX', ttlSeconds);
        logger.debug(`Redis SET: ${key} (TTL: ${ttlSeconds}s)`);
    } catch (err) {
        logger.error(`Redis SET error (key: ${key}):`, err.message);
    }
};

/**
 * Delete one or more keys.
 * @param {...string} keys
 */
const del = async (...keys) => {
    if (!client) return;
    try {
        await client.del(...keys);
        logger.debug(`Redis DEL: ${keys.join(', ')}`);
    } catch (err) {
        logger.error(`Redis DEL error:`, err.message);
    }
};

/**
 * Delete all keys matching a prefix pattern using SCAN (safe for production).
 * @param {string} prefix  e.g. 'interview:' or 'outputbased:'
 */
const delByPrefix = async (prefix) => {
    if (!client) return;
    try {
        let cursor = '0';
        const keysToDelete = [];
        do {
            const [nextCursor, keys] = await client.scan(cursor, 'MATCH', `${prefix}*`, 'COUNT', 100);
            cursor = nextCursor;
            keysToDelete.push(...keys);
        } while (cursor !== '0');

        if (keysToDelete.length > 0) {
            await client.del(...keysToDelete);
            logger.info(`Redis: deleted ${keysToDelete.length} keys with prefix "${prefix}"`);
        }
    } catch (err) {
        logger.error(`Redis delByPrefix error (prefix: ${prefix}):`, err.message);
    }
};

module.exports = { get, set, del, delByPrefix };
