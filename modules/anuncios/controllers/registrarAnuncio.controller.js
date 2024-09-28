const Announcement = require('../../../models/otros/anuncio.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');


AWS.config.update({
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  
  const s3 = new AWS.S3();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Configure Multer storage para S3
var storage3 = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './bucket/');
    },
  
    filename: function (request, file, callback) {
        return callback(null,file.originalname);
    }
});

const upload = multer({ storage: storage3 }).array('file', 1);

// Apply the multer middleware to the route
exports.postAnnouncement = [
    upload,
    async (request, response) => {
        const firebaseUID = request.userUID.uid;
        const titulo = request.body.titulo;
        const contenido = request.body.contenido;
        const imagen = request.body.imagen;
        

        try {



            console.log("Upload middleware executed");
            console.log("Request body:", request.body);
            console.log("Request files:", request.files);

            if (request.files && request.files.length > 0) {
                var pathDest = request.files[0].destination.slice(1)
                //var finalPath = path.join(__dirname, '../../../'+pathDest)
                console.log("Final path:", finalPath);
                console.log("Path destination:", pathDest);
                var finalPath = request.files[0].filename;
                await Announcement.postAnnouncement(firebaseUID, titulo, contenido, finalPath);
            } else {
                console.log("No files uploaded");
                await Announcement.postAnnouncement(firebaseUID, titulo, contenido, imagen);
            }

            console.log("Borrando archivo:", path.join(__dirname, '../../.././bucket', request.files[0].filename))

            fs.readFile(path.join(__dirname, '../../.././bucket', request.files[0].filename), (err, data) => {

                if (err) throw err;
                    var base64data = new Buffer(data, 'binary');
                    const params = {
                        Bucket: process.env.AWS_BUCKET,
                        Key: "Announcements/" + request.files[0].filename,
                        Body: base64data
                };

                s3.upload(params, function(s3Err, data) {
                    if (s3Err) throw s3Err
                
                    console.log(`File uploaded successfully at ${data.Location}`)

                    fs.unlink(path.join(__dirname, '../../.././bucket', request.files[0].filename), (err) => {
                        if (err) {
                            console.error(err)
                            response.status(500).json({code: 500, msg:"Error al borrar el archivo"})
                        }
        
                        response.status(200).json({code: 200, msg:"Ok"})
                    })
                })

            })



        } catch (error) {
            console.error("Error in postAnnouncement:", error);
            return response.status(500).json({ message: 'Error al crear el anuncio', error: error.message });
        }
    }
];