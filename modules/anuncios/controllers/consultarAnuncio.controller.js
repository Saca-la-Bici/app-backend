
const Announcement = require('../../../models/otros/anuncio.model');

exports.getAnnouncements = async (request, response) => {
    try {
        const anuncio = await Announcement.getAnnouncements();
        if (anuncio.length === 0) {
            return response.status(200).json({
                anuncio: [],
                permisos: request.permisos
            });
        }
        return response.status(200).json({
            anuncio: anuncio, 
            permisos: request.permisos
        });
    } catch (error) {
        return response.status(404).json({ message: 'Anuncio no encontrado', error: error.message });
    }
};