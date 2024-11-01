const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload thumbnail
const uploadThumbnail = async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
        folder: 'templates/thumbnails'
    });
    return result.secure_url; // Return the URL of the uploaded thumbnail
};

// Upload user profile image
const uploadUserProfileImage = async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
        folder: 'users/profile-images'
    });
    return result.secure_url; // Return the URL of the uploaded profile image
};

module.exports = {
    uploadThumbnail,
    uploadUserProfileImage,
};
