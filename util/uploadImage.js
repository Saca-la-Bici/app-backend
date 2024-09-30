const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

// Configure Multer storage
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './bucket/');
    },
  
    filename: function (request, file, callback) {
        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}-${file.originalname}`;
        callback(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });

// Middleware function
const uploadToS3 = (request, res, next) => {
    if (!request.file) {
        console.error('No file uploaded');
        return next();
    }
    const folder = request.body.folder + '/';
    fs.readFile(path.join(__dirname, '.././bucket', request.file.filename), (err, data) => {

        if (err) throw err;
        var base64data = new Buffer.from(data, 'binary');
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: folder + request.file.filename,
            Body: base64data
        };

        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err

            fs.unlink(path.join(__dirname, '.././bucket', request.file.filename), (err) => {
                if (err) {
                    console.error('Error deleting local file:', err);
                    // We don't return here because the upload was successful
                }
                next(); // Continue to the next middleware
            });
        })
    })
};

module.exports = {
    upload,
    uploadToS3
};