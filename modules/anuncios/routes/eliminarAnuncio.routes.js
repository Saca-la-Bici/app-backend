const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

// Importar el controlador que maneja la creación de actividades
const eliminarAnuncioController = require('../controllers/eliminarAnuncio.controller');

// Definir la ruta para crear una actividad
router.delete('/:IDAnuncio', verifyUserToken, eliminarAnuncioController.deleteAnnouncement);

module.exports = router;