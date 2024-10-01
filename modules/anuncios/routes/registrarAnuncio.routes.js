const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const {upload, uploadToS3} = require('../../../util/uploadImage');

// Importar el controlador que maneja la creación de actividades
const registrarAnuncioController = require('../controllers/registrarAnuncio.controller');

// Definir la ruta para crear una actividad
router.post('/', verifyUserToken, registrarAnuncioController.postAnnouncement);

module.exports = router;