const Announcement = require('../../../models/otros/anuncio.model');
const deleteImage = require('../../../util/deleteImage')

exports.deleteAnnouncement = async (request, response) => {
    const IDAnuncio = request.params.IDAnuncio
    const folder = "announcements"
    try {
        const imagen = await Announcement.getImagen(IDAnuncio)
        const anuncio = await Announcement.deleteAnnouncement(IDAnuncio);
        deleteImage(folder, imagen);
        return response.status(204).json(anuncio);
    } catch (error) {
        return response.status(404).json({ message: 'Error al eliminar el anuncio', error: error.message });
    }
};