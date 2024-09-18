const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const consultarAnuncioController = require('../controllers/consultarAnuncio.controller');

// Definir la ruta para crear una actividad
router.get('/', consultarAnuncioController.getAnnouncements);

module.exports = router;