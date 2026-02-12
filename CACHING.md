# Caching Implementation

## Overview

This application implements in-memory caching using `node-cache` to improve performance by reducing database queries and response times.

## Features

- **In-Memory Caching**: Fast access to frequently requested data
- **Automatic Expiration**: Data expires after TTL (Time To Live)
- **Cache Invalidation**: Automatic cache clearing on data mutations
- **Cache Headers**: `X-Cache` header indicates HIT/MISS status
- **Performance Monitoring**: Response time tracking with stopwatch

## Cache Configuration

Located in `cache.js`:

- **Default TTL**: 300 seconds (5 minutes)
- **Check Period**: 60 seconds (automatic cleanup)
- **Use Clones**: false (better performance)

## Caching Strategy

### Module Controller

| Endpoint | Cache Key Pattern | TTL | Invalidated On |
|----------|------------------|-----|----------------|
| `getAllModules` | `modules:all:{published}:{page}:{limit}` | 5 min | create/update/delete module |
| `getModuleById` | `modules:id:{id}` | 10 min | create/update/delete module |
| `getModuleByName` | `modules:name:{name}` | 10 min | create/update/delete module |
| `getModulesWithStats` | `modules:stats` | 5 min | create/update/delete module |

### Lesson Controller

| Endpoint | Cache Key Pattern | TTL | Invalidated On |
|----------|------------------|-----|----------------|
| `getLessonsByModule` | `lessons:module:{moduleId}:{published}:{page}:{limit}` | 5 min | create/update/delete lesson |
| `getLessonById` | `lessons:id:{id}` | 10 min | create/update/delete lesson |
| `getLessonsWithStats` | `lessons:stats:{moduleId}` | 5 min | create/update/delete lesson |

### User Controller

| Endpoint | Cache Key Pattern | TTL | Invalidated On |
|----------|------------------|-----|----------------|
| `findOrCreateUser` | `user:google:{googleId}` | 30 min | User updates |

## Response Format

Cached responses include additional fields:

```json
{
  "success": true,
  "data": [...],
  "responseTimeMs": 15.23,
  "cached": true
}
```

And headers:
- `X-Cache`: `HIT` or `MISS`
- `X-Response-Time`: `15.23ms`

## Cache Invalidation

When data is created, updated, or deleted, related caches are automatically invalidated:

- **Module mutations** → Invalidates all `modules:*` cache keys
- **Lesson mutations** → Invalidates all `lessons:*` cache keys

Example:
```javascript
// After creating a module
invalidateByPattern('modules');
```

## Monitoring Cache Performance

### Check Cache Hit Rate

In your browser console or response data, look for:
- `X-Cache: HIT` - Data served from cache (fast)
- `X-Cache: MISS` - Data fetched from database (slower)
- `responseTimeMs` - Total response time

### Cache Statistics

To view cache statistics in logs:
```javascript
const { getStats } = require('./cache');
console.log(getStats());
```

Returns:
```json
{
  "keys": 15,
  "hits": 234,
  "misses": 45,
  "ksize": 15,
  "vsize": 4500
}
```

## Performance Benefits

With caching enabled:

1. **Reduced Database Load**: 50-80% fewer database queries
2. **Faster Response Times**: 
   - Cache MISS: ~50-200ms (database query)
   - Cache HIT: ~1-5ms (in-memory)
3. **Better Scalability**: More concurrent users supported
4. **Lower Latency**: Especially for complex queries with joins

## Testing Cache Behavior

### Test Cache HIT

1. Make a request to any GET endpoint
2. Check `X-Cache: MISS` and note `responseTimeMs`
3. Make the same request again immediately
4. Check `X-Cache: HIT` and compare `responseTimeMs` (should be much faster)

### Test Cache Invalidation

1. Make a GET request (should be MISS first time)
2. Make the same request again (should be HIT)
3. Create/Update/Delete related data
4. Make the same GET request (should be MISS as cache was invalidated)

## Manual Cache Management

### Clear All Cache

```javascript
const { clearAll } = require('./cache');
clearAll();
```

### Invalidate Specific Pattern

```javascript
const { invalidateByPattern } = require('./cache');
invalidateByPattern('modules'); // Clear all module caches
invalidateByPattern('lessons:module:123'); // Clear specific module's lessons
```

### Invalidate Specific Key

```javascript
const { invalidate } = require('./cache');
invalidate('modules:id:abc123');
```

## Best Practices

1. **Keep TTL reasonable**: Balance freshness vs performance
2. **Monitor hit rates**: Aim for 60-80% cache hit rate
3. **Invalidate on mutations**: Always clear related caches when data changes
4. **Use specific cache keys**: Include relevant parameters in key generation
5. **Log cache operations**: Use logger for debugging cache issues

## Troubleshooting

### Stale Data

If you see outdated data:
- Check cache invalidation is working in mutation endpoints
- Verify TTL settings are appropriate
- Manually clear cache: `clearAll()`

### High Memory Usage

If cache grows too large:
- Reduce TTL values
- Reduce `stdTTL` in cache configuration
- Implement size-based eviction limits

### Cache Not Working

Verify:
1. `node-cache` is installed
2. `cache.js` is properly imported
3. Cache keys are being generated correctly
4. No errors in cache wrapper execution

## Future Enhancements

Potential improvements:

- **Redis Integration**: For distributed caching across multiple servers
- **Cache Warming**: Pre-populate cache on startup
- **Selective Caching**: Cache only popular/expensive queries
- **Compression**: Compress large cached values
- **Cache Metrics Dashboard**: Real-time cache performance monitoring
