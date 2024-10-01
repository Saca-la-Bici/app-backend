const Announcement = require('../../../models/otros/anuncio.model');
const AWS = require('aws-sdk');
const getImageFolder = require('../../../util/getImageFolder');


  exports.getAnnouncements = async (req, res, next) => {
    try {
        const announcements = await Announcement.getAnnouncements();
        if (announcements.length === 0) {
            return response.status(200).json({
                announcements: [],
                permisos: request.permisos
            });
        }
        announcements.imagen = await getImageFolder(req, 'announcements')
        return response.status(200).json({
            announcements: announcements,
            permisos: request.permisos
        });
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ message: 'Error fetching announcements', error: error.message });
    }
};
