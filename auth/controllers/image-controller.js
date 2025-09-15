const Image = require('../models/Image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const fs = require('fs');

const uploadImageController = async (req, res) => {
    try {
        // check if file is missing in req obj
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required'
            });
        }

        console.log('File received:', req.file); // Debug log
        console.log('File path:', req.file.path); // Debug log

        // upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        // store the image url and public id along with the uploaded user id in database
        const newUploadImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId,
        });

        await newUploadImage.save();

        // delte the file from local stroage
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newUploadImage
        });

    } catch (error) {
        console.log('Upload controller error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong! Please try again'
        });
    }
};

const fetchImagesController = async (req, res) => {
    try {
        const images = await Image.find({});

        if (images) {
            res.status(200).json({
                success: true,
                data: images,
            });
        }
    } catch (error) {
        console.log('Upload controller error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong! Please try again'
        });
    }
}

const deleteImageController = async(req,res) => {
    try {
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

        if (!image) {
            return res.status(404).json({
                success : false,
                message : 'Image not found'
            })
        }

        if(image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success : false,
                message : 'You are not authorized to delete this img'
            })
        }

     } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred! Please try again."
        })
    }
}

module.exports = {
    uploadImageController,
    fetchImagesController,
};