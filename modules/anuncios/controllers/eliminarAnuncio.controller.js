
const Announcement = require('../../../models/otros/anuncio.model');

exports.deleteAnnouncement = async (request, response) => {
    const IDAnuncio = request.params.IDAnuncio
    try {
        const anuncio = await Announcement.deleteAnnouncement(IDAnuncio);
        return response.status(204).json(anuncio);
    } catch (error) {
        return response.status(404).json({ message: 'Error al eliminar el anuncio', error: error.message });
    }
};