const express = require('express');
const authMiddleware = require('../middleware/auth-middleware')
const router = require('./auth-routes');

router.get('/welcome', authMiddleware, (req, res) => {
    const {username, userId, role} = req.userInfo;
    res.json({
        message: 'Welcome to the home page',
        user: {
            _id: userId,
            username,
            role
        }
    });
});

module.exports = router