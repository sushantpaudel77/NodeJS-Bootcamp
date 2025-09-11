const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadToCloudinary = async (filePath) => {
    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'ecommerce-uploads', // Optional: organize uploads in folders
            resource_type: 'auto'
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };

    } catch (error) {
        console.log('Error while uploading to cloudinary:', error);
        
        // Delete local file if it exists (cleanup on error)
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};

module.exports = {
    uploadToCloudinary,
};