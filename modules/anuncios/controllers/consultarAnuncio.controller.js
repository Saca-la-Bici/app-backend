const Announcement = require('../../../models/otros/anuncio.model');
const AWS = require('aws-sdk');

AWS.config.update({
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  
  const s3 = new AWS.S3();

  exports.getAnnouncements = async (req, res, next) => {
    try {
        // Tu lógica para obtener los anuncios
        const announcements = await Announcement.getAnnouncements(); // Ejemplo de función

        req.announcements = announcements; // Adjuntar los anuncios al objeto de la solicitud
        next(); // Proceder al siguiente middleware (getImage)
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ message: 'Error fetching announcements', error: error.message });
    }
};

/*
exports.getImagen = async (request, response) => {
    const folderPath = 'Announcements/'; // Replace with your folder path
    const bucketName = process.env.AWS_BUCKET;
    
    const params = {
        Bucket: bucketName,
        Prefix: folderPath
    };
    
    try {
        const data = await s3.listObjectsV2(params).promise();
        const imageKeys = data.Contents.filter(item => {
            // Filter based on file extensions (e.g., .jpg, .png, .gif)
            return item.Key.match(/\.(jpg|jpeg|png|gif)$/);
        }).map(item => item.Key);
    
        const imageUrls = imageKeys.map((key) => {
            const imageParams = {
                Bucket: bucketName,
                Key: key,
                Expires: 60 * 1 // URL expiration time in seconds (e.g., 1 hour)
            };
            const url = s3.getSignedUrl('getObject', imageParams);
            return {
                key: key,
                url: url
            };
        });
    
        response.status(200).json({ images: imageUrls });
    } catch (error) {
        console.error('Error fetching images from S3:', error);
        response.status(500).json({ message: 'Error fetching images from S3', error: error.message });
    }
};*/
