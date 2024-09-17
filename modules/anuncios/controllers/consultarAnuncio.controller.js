
const Announcement = require('../../../models/otros/anuncio.model');

exports.getAnnouncements = async (request, response) => {
    try {
        const anuncio = await Announcement.getAnnouncements();
        if(anuncio.length === 0){
            return response.status(204).json({ message: 'No hay anuncios' });
        }
        return response.status(201).json(anuncio);
    } catch (error) {
        return response.status(404).json({ message: 'Anuncio no encontrado', error: error.message });
    }
};