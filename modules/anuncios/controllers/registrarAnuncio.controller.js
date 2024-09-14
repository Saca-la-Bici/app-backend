
const Announcement = require('../../../models/otros/anuncio.model');

exports.postAnnouncement = async (request, response) => {
    const idUsuario = request.body.IDUsuario
    const contenido = request.body.contenido;
    const imagen = request.body.imagen;
    try {
        await Announcement.postAnnouncement(idUsuario, contenido, imagen);
        return response.status(201).json({ message: 'Anuncio creado correctamente' });
    } catch (error) {
        return response.status(500).json({ message: 'Error al crear el anuncio', error: error.message });
    }
};