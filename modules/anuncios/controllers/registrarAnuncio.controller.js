const Announcement = require('../../../models/otros/anuncio.model');
const { upload, uploadToS3 } = require('../../../util/uploadImage');

exports.postAnnouncement = [
    upload.single('file'),
    uploadToS3,
    async (request, response) => {
        const firebaseUID = request.userUID.uid;
        const titulo = request.body.titulo;
        const contenido = request.body.contenido;
        const imagen = request.file ? request.file.filename : null;

        try {
            await Announcement.postAnnouncement(firebaseUID, titulo, contenido, imagen);
            return response.status(201).json({ message: 'Anuncio creado exitosamente' });

        } catch (error) {
            console.error("Error in postAnnouncement:", error);
            return response.status(500).json({ message: 'Error al crear el anuncio', error: error.message });
        }
    }
];