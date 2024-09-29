const Announcement = require('../../../models/otros/anuncio.model');

exports.patchAnnouncement = async (request, response) => {
    const IDAnuncio = request.params.IDAnuncio
    const titulo = request.body.titulo;
    const contenido = request.body.contenido;
    const imagen = request.body.imagen;
    try {
        const anuncio = await Announcement.patchAnnouncement(IDAnuncio, titulo, contenido, imagen);
        return response.status(201).json(anuncio);
    } catch (error) {
        return response.status(404).json({ message: 'Anuncio no encontrado', error: error.message });
    }
};