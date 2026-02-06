const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/current_user', (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

module.exports = router;
