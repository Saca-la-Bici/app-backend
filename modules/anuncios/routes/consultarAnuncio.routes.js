const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const consultarAnuncioController = require('../controllers/consultarAnuncio.controller');
const getImageFolder = require('../../../util/getImageFolder');


/* Define la ruta para obtener anuncios con URLs de imágenes
router.get('/', verifyUserToken, getAnnouncements, getImage, (req, res) => {
    res.status(200).json({ announcements: req.announcements });
});
*/
router.get('/', verifyUserToken, consultarAnuncioController.getAnnouncements);

// Define the route for getting an image with middleware
//router.get('/:IDAnuncio', verifyUserToken, getImage, getAnnouncementsController.getAnnouncement);

module.exports = router;