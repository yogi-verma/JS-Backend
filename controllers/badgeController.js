const UserBadge = require('../models/UserBadge');
const logger = require('../logger');

// ══════════════════════════════════════════════
//  BADGE DEFINITIONS (LeetCode-style milestones)
// ══════════════════════════════════════════════
const BADGE_DEFINITIONS = [
    {
        badgeId: 'streak_1',
        name: 'Consistent Coder',
        description: 'Maintained a 1-day coding streak! You\'re building a rock-solid habit.',
        icon: '🥉',
        tier: 'bronze',
        milestone: 1
    },
    {
        badgeId: 'streak_30',
        name: 'Dedicated Developer',
        description: 'Achieved a 30-day coding streak! A full month of relentless practice.',
        icon: '🥈',
        tier: 'silver',
        milestone: 30
    },
    {
        badgeId: 'streak_45',
        name: 'Code Warrior',
        description: 'Crushed a 45-day coding streak! Your discipline is truly impressive.',
        icon: '🥇',
        tier: 'gold',
        milestone: 45
    },
    {
        badgeId: 'streak_90',
        name: 'Legendary Programmer',
        description: '90-day coding streak achieved! You are an unstoppable force of code.',
        icon: '🏆',
        tier: 'platinum',
        milestone: 90
    }
];

// ──────────────────────────────────────────────
//  Helper: Check & award badges after a streak update
//  Returns array of newly awarded badges (for popup)
// ──────────────────────────────────────────────
const checkAndAwardBadges = async (userId, currentStreak) => {
    try {
        const newlyAwarded = [];

        // Get badges the user already has
        const existingBadges = await UserBadge.find({ userId }).select('badgeId').lean();
        const earnedBadgeIds = new Set(existingBadges.map(b => b.badgeId));

        // Check each milestone
        for (const badge of BADGE_DEFINITIONS) {
            if (currentStreak >= badge.milestone && !earnedBadgeIds.has(badge.badgeId)) {
                const newBadge = await UserBadge.create({
                    userId,
                    badgeId: badge.badgeId,
                    name: badge.name,
                    description: badge.description,
                    icon: badge.icon,
                    tier: badge.tier,
                    milestone: badge.milestone
                });

                newlyAwarded.push({
                    badgeId: newBadge.badgeId,
                    name: newBadge.name,
                    description: newBadge.description,
                    icon: newBadge.icon,
                    tier: newBadge.tier,
                    milestone: newBadge.milestone,
                    earnedAt: newBadge.earnedAt
                });

                logger.info(`Badge "${badge.name}" awarded to user ${userId} (streak: ${currentStreak})`);
            }
        }

        return newlyAwarded;
    } catch (error) {
        logger.error('Error checking/awarding badges:', error);
        return [];  // Don't break the streak flow if badge logic fails
    }
};

// ══════════════════════════════════════════════
//  GET /api/badges — All badges for the logged-in user
// ══════════════════════════════════════════════
const getUserBadges = async (req, res) => {
    try {
        const userId = req.user._id;

        const earnedBadges = await UserBadge.find({ userId })
            .sort({ milestone: 1 })
            .lean();

        // Return all badge definitions with earned status
        const allBadges = BADGE_DEFINITIONS.map(def => {
            const earned = earnedBadges.find(b => b.badgeId === def.badgeId);
            return {
                badgeId: def.badgeId,
                name: def.name,
                description: def.description,
                icon: def.icon,
                tier: def.tier,
                milestone: def.milestone,
                earned: !!earned,
                earnedAt: earned ? earned.earnedAt : null
            };
        });

        res.json({
            success: true,
            data: {
                badges: allBadges,
                totalEarned: earnedBadges.length,
                totalAvailable: BADGE_DEFINITIONS.length
            }
        });
    } catch (error) {
        logger.error('Error fetching user badges:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch badges' });
    }
};

// ══════════════════════════════════════════════
//  GET /api/badges/unseen — Unseen badges (for popup)
// ══════════════════════════════════════════════
const getUnseenBadges = async (req, res) => {
    try {
        const userId = req.user._id;

        const unseenBadges = await UserBadge.find({ userId, seen: false })
            .sort({ milestone: 1 })
            .lean();

        res.json({
            success: true,
            data: {
                badges: unseenBadges.map(b => ({
                    badgeId: b.badgeId,
                    name: b.name,
                    description: b.description,
                    icon: b.icon,
                    tier: b.tier,
                    milestone: b.milestone,
                    earnedAt: b.earnedAt
                }))
            }
        });
    } catch (error) {
        logger.error('Error fetching unseen badges:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch unseen badges' });
    }
};

// ══════════════════════════════════════════════
//  PATCH /api/badges/seen — Mark badges as seen
//  Body: { badgeIds: ['streak_15', 'streak_30'] }
// ══════════════════════════════════════════════
const markBadgesAsSeen = async (req, res) => {
    try {
        const userId = req.user._id;
        const { badgeIds } = req.body;

        if (!badgeIds || !Array.isArray(badgeIds) || badgeIds.length === 0) {
            return res.status(400).json({ success: false, message: 'badgeIds array is required' });
        }

        const result = await UserBadge.updateMany(
            { userId, badgeId: { $in: badgeIds }, seen: false },
            { $set: { seen: true } }
        );

        logger.info(`User ${userId} marked ${result.modifiedCount} badge(s) as seen`);

        res.json({
            success: true,
            data: { markedCount: result.modifiedCount }
        });
    } catch (error) {
        logger.error('Error marking badges as seen:', error);
        res.status(500).json({ success: false, message: 'Failed to mark badges as seen' });
    }
};

// ══════════════════════════════════════════════
//  GET /api/badges/definitions — Public list of all available badges
// ══════════════════════════════════════════════
const getBadgeDefinitions = async (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                badges: BADGE_DEFINITIONS.map(def => ({
                    badgeId: def.badgeId,
                    name: def.name,
                    description: def.description,
                    icon: def.icon,
                    tier: def.tier,
                    milestone: def.milestone
                }))
            }
        });
    } catch (error) {
        logger.error('Error fetching badge definitions:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch badge definitions' });
    }
};

module.exports = {
    BADGE_DEFINITIONS,
    checkAndAwardBadges,
    getUserBadges,
    getUnseenBadges,
    markBadgesAsSeen,
    getBadgeDefinitions
};
