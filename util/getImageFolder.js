const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();
const bucketName = process.env.AWS_BUCKET;

const getImageFolder = (folderName) => {
    return async (req, res, next) => {
        const Json = req[folderName];

        if (!Json || !Array.isArray(Json)) {
            return res.status(400).json({ message: 'Invalid request data' });
        }

        try {
            const updatedJson = await Promise.all(Json.map(async (folder) => {
                if (folder.imagen) {
                    const imageParams = {
                        Bucket: bucketName,
                        Key: `${folderName}/${folder.imagen}`,
                        Expires: 60 * 60 // Tiempo de expiración del URL en segundos (e.g., 1 hora)
                    };
                    folder.imagen = s3.getSignedUrl('getObject', imageParams);
                } else {
                    folder.imagen = null;
                }
                return folder;
            }));

            return res.status(200).json(updatedJson);
        } catch (error) {
            console.error('Error fetching image from S3:', error);
            res.status(500).json({ message: 'Error fetching image from S3', error: error.message });
        }
    };
};

module.exports = getImageFolder;