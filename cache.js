const NodeCache = require('node-cache');
const logger = require('./logger');

// Create cache instance with default TTL of 5 minutes (300 seconds)
// stdTTL: standard time to live in seconds
// checkperiod: period in seconds to automatically delete expired keys
const cache = new NodeCache({ 
    stdTTL: 300, 
    checkperiod: 60,
    useClones: false // Better performance, but be careful with mutations
});

// Cache statistics
cache.on('set', (key) => {
    logger.debug(`Cache SET: ${key}`);
});

cache.on('del', (key) => {
    logger.debug(`Cache DELETE: ${key}`);
});

cache.on('expired', (key) => {
    logger.debug(`Cache EXPIRED: ${key}`);
});

// Helper to generate cache keys
const generateKey = (prefix, ...args) => {
    return `${prefix}:${args.filter(arg => arg !== undefined && arg !== null).join(':')}`;
};

// Cache wrapper for async functions
const cacheWrapper = async (key, ttl, fetchFunction) => {
    try {
        // Try to get from cache
        const cachedData = cache.get(key);
        if (cachedData !== undefined) {
            logger.debug(`Cache HIT: ${key}`);
            return { data: cachedData, fromCache: true };
        }

        // Cache miss - fetch data
        logger.debug(`Cache MISS: ${key}`);
        const data = await fetchFunction();
        
        // Store in cache
        cache.set(key, data, ttl);
        
        return { data, fromCache: false };
    } catch (error) {
        logger.error(`Cache error for key ${key}:`, error);
        throw error;
    }
};

// Invalidate cache by pattern
const invalidateByPattern = (pattern) => {
    const keys = cache.keys();
    const matchingKeys = keys.filter(key => key.includes(pattern));
    
    if (matchingKeys.length > 0) {
        cache.del(matchingKeys);
        logger.info(`Cache invalidated: ${matchingKeys.length} keys matching "${pattern}"`);
    }
    
    return matchingKeys.length;
};

// Invalidate specific key
const invalidate = (key) => {
    const deleted = cache.del(key);
    if (deleted > 0) {
        logger.debug(`Cache invalidated: ${key}`);
    }
    return deleted;
};

// Clear all cache
const clearAll = () => {
    cache.flushAll();
    logger.info('Cache cleared: all keys');
};

// Get cache statistics
const getStats = () => {
    return cache.getStats();
};

module.exports = {
    cache,
    generateKey,
    cacheWrapper,
    invalidate,
    invalidateByPattern,
    clearAll,
    getStats
};
