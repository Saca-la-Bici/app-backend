
const Announcement = require('../../../models/otros/anuncio.model');

exports.postAnnouncement = async (request, response) => {
    const idUsuario = request.body.IDUsuario;
    console.log("LLEGAMOS AL CONTROLLER")
    console.log('IDUsuario:', idUsuario);
    const titulo = request.body.titulo;
    const contenido = request.body.contenido;
    const imagen = request.body.imagen;
    try {
        await Announcement.postAnnouncement(idUsuario, titulo, contenido, imagen);
        return response.status(201).json({ message: 'Anuncio creado correctamente' });
    } catch (error) {
        return response.status(500).json({ message: 'Error al crear el anuncio', error: error.message });
    }
};