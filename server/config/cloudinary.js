const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier'); // You'll need to install this package

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload thumbnail
const uploadThumbnail = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' }, 
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );

        // Use streamifier to convert the buffer to a stream
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

module.exports = { uploadThumbnail };
