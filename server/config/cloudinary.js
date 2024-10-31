const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: dkynwi65w,
    api_key: api_key,
    api_secret: api_secret,
});

// Upload thumbnail
const uploadThumbnail = async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
        folder: 'templates/thumbnails'
    });
    return result.secure_url; // Return the URL of the uploaded thumbnail
};
