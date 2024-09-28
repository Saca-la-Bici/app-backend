const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucketName = process.env.AWS_BUCKET;

const getImageFolder = (folderName) => {
    return async (req, res, next) => {
        const announcements = req.announcements; // Suponiendo que los anuncios vienen en req.announcements

        if (!announcements || !Array.isArray(announcements)) {
            return res.status(400).json({ message: 'Invalid announcements data' });
        }

        try {
            const updatedAnnouncements = await Promise.all(announcements.map(async (announcement) => {
                if (announcement.imagen) {
                    const imageParams = {
                        Bucket: bucketName,
                        Key: `${folderName}/${announcement.imagen}`,
                        Expires: 60 * 60 // Tiempo de expiración del URL en segundos (e.g., 1 hora)
                    };
                    announcement.imagen = s3.getSignedUrl('getObject', imageParams);
                } else {
                    announcement.imagen = null;
                }
                return announcement;
            }));

            req.announcements = updatedAnnouncements;
            next();
        } catch (error) {
            console.error('Error fetching image from S3:', error);
            res.status(500).json({ message: 'Error fetching image from S3', error: error.message });
        }
    };
};

module.exports = getImageFolder;