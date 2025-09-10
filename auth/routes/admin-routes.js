const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware')
const adminMiddleWare = require('../middleware/admin-middleware')

router.get('/welcome', authMiddleware, adminMiddleWare, (req, res) => {
    res.json({
        message : 'Welcome to the admin page.'
    })
})

module.exports = router