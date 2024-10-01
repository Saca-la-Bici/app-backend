const Announcement = require('../../../models/otros/anuncio.model');
const { upload, uploadToS3 } = require('../../../util/uploadImage');
const deleteImage = require('../../../util/deleteImage');



exports.putAnnouncement = [
    upload.single('file'),
    uploadToS3,
    async (request, response) => {
        const IDAnuncio = request.params.IDAnuncio
        const titulo = request.body.titulo;
        const contenido = request.body.contenido;
        const imagenNueva = request.file ? request.file.filename : null;
        const folder = 'announcements';
        try {
            const imagenVieja = await Announcement.getImagen(IDAnuncio)
            const anuncio = await Announcement.putAnnouncement(IDAnuncio, titulo, contenido, imagenNueva);
            deleteImage(folder, imagenVieja);
            return response.status(201).json(anuncio);
        } catch (error) {
            return response.status(404).json({ message: 'Anuncio no encontrado', error: error.message });
        }
    }
];