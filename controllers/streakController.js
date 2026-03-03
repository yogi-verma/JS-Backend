const UserStreak = require('../models/UserStreak');
const logger = require('../logger');

// ──────────────────────────────────────────────
//  Helper: get today's date as 'YYYY-MM-DD' in UTC
// ──────────────────────────────────────────────
const getTodayUTC = () => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // '2026-03-03'
};

// ──────────────────────────────────────────────
//  Helper: get yesterday's date as 'YYYY-MM-DD' in UTC
// ──────────────────────────────────────────────
const getYesterdayUTC = () => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - 1);
    return d.toISOString().split('T')[0];
};

// ══════════════════════════════════════════════
//  RECORD ACTIVITY  (called internally after a
//  successful "all test-cases passed" submission)
// ══════════════════════════════════════════════
const recordActivity = async (userId) => {
    try {
        const today = getTodayUTC();

        let streak = await UserStreak.findOne({ userId });

        // First-time user — create fresh record
        if (!streak) {
            streak = await UserStreak.create({
                userId,
                currentStreak: 1,
                longestStreak: 1,
                lastActiveDate: today,
                activeDays: [{ date: today, count: 1 }],
                totalActiveDays: 1
            });
            logger.info(`Streak created for user ${userId} — Day 1`);
            return { streak, isFirstOfDay: true };
        }

        // Already active today — just bump the solve count
        if (streak.lastActiveDate === today) {
            const dayEntry = streak.activeDays.find(d => d.date === today);
            if (dayEntry) {
                dayEntry.count += 1;
            }
            await streak.save();
            logger.debug(`User ${userId} solved another problem today (count: ${dayEntry?.count})`);
            return { streak, isFirstOfDay: false };
        }

        // --- New active day ---
        const yesterday = getYesterdayUTC();

        if (streak.lastActiveDate === yesterday) {
            // Consecutive day — extend streak
            streak.currentStreak += 1;
        } else {
            // Streak broken — restart at 1
            streak.currentStreak = 1;
        }

        // Update longest streak if needed
        if (streak.currentStreak > streak.longestStreak) {
            streak.longestStreak = streak.currentStreak;
        }

        streak.lastActiveDate = today;
        streak.activeDays.push({ date: today, count: 1 });
        streak.totalActiveDays += 1;

        await streak.save();
        logger.info(`User ${userId} streak updated — current: ${streak.currentStreak}, longest: ${streak.longestStreak}`);
        return { streak, isFirstOfDay: true };
    } catch (error) {
        logger.error('Error recording streak activity:', error);
        throw error;
    }
};

// ══════════════════════════════════════════════
//  GET /api/streak — Current streak summary
// ══════════════════════════════════════════════
const getStreak = async (req, res) => {
    try {
        const userId = req.user._id;
        const today = getTodayUTC();

        const streak = await UserStreak.findOne({ userId });

        if (!streak) {
            return res.json({
                success: true,
                data: {
                    currentStreak: 0,
                    longestStreak: 0,
                    totalActiveDays: 0,
                    isActiveToday: false,
                    todaySolveCount: 0
                }
            });
        }

        // If user missed yesterday AND hasn't solved today, current streak is 0
        const yesterday = getYesterdayUTC();
        let effectiveStreak = streak.currentStreak;
        if (streak.lastActiveDate !== today && streak.lastActiveDate !== yesterday) {
            effectiveStreak = 0;
        }

        const todayEntry = streak.activeDays.find(d => d.date === today);

        res.json({
            success: true,
            data: {
                currentStreak: effectiveStreak,
                longestStreak: streak.longestStreak,
                totalActiveDays: streak.totalActiveDays,
                isActiveToday: streak.lastActiveDate === today,
                todaySolveCount: todayEntry ? todayEntry.count : 0
            }
        });
    } catch (error) {
        logger.error('Error fetching streak:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch streak data' });
    }
};

// ══════════════════════════════════════════════
//  GET /api/streak/calendar?year=2026&month=3
//  Returns active days for a given month (or full year)
//  LeetCode-style heatmap data
// ══════════════════════════════════════════════
const getCalendar = async (req, res) => {
    try {
        const userId = req.user._id;
        const { year, month } = req.query;

        if (!year) {
            return res.status(400).json({ success: false, message: 'year query param is required' });
        }

        const streak = await UserStreak.findOne({ userId });

        if (!streak) {
            return res.json({
                success: true,
                data: {
                    year: parseInt(year),
                    month: month ? parseInt(month) : null,
                    activeDays: [],
                    totalActive: 0
                }
            });
        }

        let filteredDays;

        if (month) {
            // Filter for specific month: 'YYYY-MM'
            const prefix = `${year}-${String(month).padStart(2, '0')}`;
            filteredDays = streak.activeDays.filter(d => d.date.startsWith(prefix));
        } else {
            // Full year
            filteredDays = streak.activeDays.filter(d => d.date.startsWith(`${year}`));
        }

        // Return as a map: { "2026-03-01": 2, "2026-03-03": 1, ... }
        const activeDaysMap = {};
        filteredDays.forEach(d => {
            activeDaysMap[d.date] = d.count;
        });

        res.json({
            success: true,
            data: {
                year: parseInt(year),
                month: month ? parseInt(month) : null,
                activeDays: activeDaysMap,
                totalActive: filteredDays.length
            }
        });
    } catch (error) {
        logger.error('Error fetching calendar:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch calendar data' });
    }
};

// ══════════════════════════════════════════════
//  GET /api/streak/history — Full activity timeline
//  Returns last N days of activity for heatmap
// ══════════════════════════════════════════════
const getActivityHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const { days = 365 } = req.query; // Default: last 365 days (like LeetCode)

        const streak = await UserStreak.findOne({ userId });

        if (!streak) {
            return res.json({
                success: true,
                data: {
                    activeDays: {},
                    currentStreak: 0,
                    longestStreak: 0,
                    totalActiveDays: 0,
                    dateRange: { start: null, end: null }
                }
            });
        }

        const today = getTodayUTC();
        const yesterday = getYesterdayUTC();

        // Calculate date N days ago
        const startDate = new Date();
        startDate.setUTCDate(startDate.getUTCDate() - parseInt(days));
        const startStr = startDate.toISOString().split('T')[0];

        // Filter active days within the range
        const filteredDays = streak.activeDays.filter(d => d.date >= startStr && d.date <= today);

        const activeDaysMap = {};
        filteredDays.forEach(d => {
            activeDaysMap[d.date] = d.count;
        });

        // Effective current streak (account for gap)
        let effectiveStreak = streak.currentStreak;
        if (streak.lastActiveDate !== today && streak.lastActiveDate !== yesterday) {
            effectiveStreak = 0;
        }

        res.json({
            success: true,
            data: {
                activeDays: activeDaysMap,
                currentStreak: effectiveStreak,
                longestStreak: streak.longestStreak,
                totalActiveDays: streak.totalActiveDays,
                dateRange: {
                    start: startStr,
                    end: today
                }
            }
        });
    } catch (error) {
        logger.error('Error fetching activity history:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch activity history' });
    }
};

module.exports = {
    recordActivity,
    getStreak,
    getCalendar,
    getActivityHistory
};
