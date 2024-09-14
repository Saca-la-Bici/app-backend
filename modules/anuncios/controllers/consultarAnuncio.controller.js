
const Announcement = require('../../../models/otros/anuncio.model');

exports.getAnnouncement = async (request, response) => {
    const IDAnuncio = request.params.IDAnuncio
    try {
        const anuncio = await Announcement.getAnnouncement(IDAnuncio);
        return response.status(201).json(anuncio);
    } catch (error) {
        return response.status(404).json({ message: 'Anuncio no encontrado', error: error.message });
    }
};