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
