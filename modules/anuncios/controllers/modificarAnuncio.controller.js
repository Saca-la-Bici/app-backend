const Announcement = require('../../../models/otros/anuncio.model');

exports.putAnnouncement = async (request, response) => {
    const IDAnuncio = request.params.IDAnuncio
    const firebaseUID = request.userUID.uid;
    const titulo = request.body.titulo;
    const contenido = request.body.contenido;
    const imagen = request.body.imagen;
    try {
        const anuncio = await Announcement.putAnnouncement(IDAnuncio, firebaseUID, titulo, contenido, imagen);
        return response.status(201).json(anuncio);
    } catch (error) {
        return response.status(404).json({ message: 'Anuncio no encontrado', error: error.message });
    }
};