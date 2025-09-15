const Image = require('../models/Image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

// Upload Image
const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File is required' });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newImage.save();

    fs.unlinkSync(req.file.path); // remove local file

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      image: newImage,
    });
  } catch (error) {
    console.log('Upload controller error:', error);
    res.status(500).json({ success: false, message: error.message || 'Something went wrong!' });
  }
};

// Fetch all images
const fetchImagesController = async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.log('Fetch images error:', error);
    res.status(500).json({ success: false, message: error.message || 'Something went wrong!' });
  }
};

// Delete single image
const deleteImageController = async (req, res) => {
  try {
    const imageId = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ success: false, message: 'Image not found' });

    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this image' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from DB
    await Image.findByIdAndDelete(imageId);

    res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.log('Delete image error:', error);
    res.status(500).json({ success: false, message: error.message || 'Something went wrong!' });
  }
};

module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
};
