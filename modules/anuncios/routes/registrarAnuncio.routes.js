const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const registrarAnuncioController = require('../controllers/registrarAnuncio.controller');

// Definir la ruta para crear una actividad
router.get('/', registrarAnuncioController.getPrueba);

module.exports = router;