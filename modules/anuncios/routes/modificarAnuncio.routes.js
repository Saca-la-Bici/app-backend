const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const modificarAnuncioController = require('../controllers/modificarAnuncio.controller');

// Definir la ruta para crear una actividad
router.put('/:IDAnuncio', modificarAnuncioController.putAnnouncement);

module.exports = router;