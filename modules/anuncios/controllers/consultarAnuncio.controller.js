const Announcement = require('../../../models/otros/anuncio.model');
const getImageFolder = require('../../../util/getImageFolder');

exports.getAnnouncements = async (request, response, next) => {
    try {
        const announcements = await Announcement.getAnnouncements();
        if (announcements.length === 0) {
            return response.status(200).json({
                announcements: [],
                permisos: request.permisos
            });
        }
        request.announcements = announcements;
        const folder = 'announcements/';
        announcements.imagen = await getImageFolder(request, folder);
        return response.status(200).json({
            announcements: announcements,
            permisos: request.permisos
        });
    } catch (error) {
        console.error('Error fetching announcements:', error);
        response.status(500).json({ message: 'Error fetching announcements', error: error.message });
    }
};
