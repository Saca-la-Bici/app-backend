const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

// Importar el controlador que maneja la creación de actividades
const modificarAnuncioController = require('../controllers/modificarAnuncio.controller');

// Definir la ruta para crear una actividad
router.put('/:IDAnuncio', verifyUserToken, modificarAnuncioController.putAnnouncement);

module.exports = router;