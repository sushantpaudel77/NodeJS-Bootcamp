const Image = require('../models/Image')
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const { image } = require('../config/cloudinary');
const uploadImageController = require('../middleware/upload-middleware')


const uploadImageController = async (req, res) => {
    try {

        // check if file is missing in req obj
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required'
            })
        }

        // upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        // store the image url and public id along with the uploaded user id in database
        const newUploadImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newUploadImage.save();

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newUploadImage
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        });
    }
};

module.exports = {
    uploadImageController,
}