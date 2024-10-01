const AWS = require("aws-sdk");

// Configure AWS SDK
AWS.config.update({
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const deleteImage = (folder, filename) => {
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${folder}/${filename}`,
    };

    s3.deleteObject(params, function(err, data) {
        if (err) {
            console.error('Error deleting image from S3:', err);
        } else {
            console.log('Image deleted successfully');
        }
    });
};


module.exports = deleteImage;