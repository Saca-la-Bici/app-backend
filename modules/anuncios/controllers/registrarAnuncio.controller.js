
const Announcement = require('../../../models/otros/anuncio.model');

exports.postAnnouncement = async (request, response) => {
    const firebaseUID = request.userUID.uid;
    const titulo = request.body.titulo;
    const contenido = request.body.contenido;
    const imagen = request.body.imagen;
    try {
        await Announcement.postAnnouncement(firebaseUID, titulo, contenido, imagen);
        return response.status(201).json({ message: 'Anuncio creado correctamente' });
    } catch (error) {
        return response.status(500).json({ message: 'Error al crear el anuncio', error: error.message });
    }
};