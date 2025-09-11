const express = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const adminMiddleWare = require('../middleware/admin-middleware')
const uploadMiddleware = require('../middleware/upload-middleware')
const { uploadImageController, fetchImagesController } = require('../controllers/image-controller')

const router = express.Router();

// upload the image
router.post('/upload', authMiddleware, adminMiddleWare, uploadMiddleware.single('image'), uploadImageController)

router.get('/fetch', authMiddleware, fetchImagesController)

module.exports = router;