const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const registrarRutaController = require('../controllers/registrarRuta.controller');

// Definir la ruta para crear una actividad
router.post('/registrarRuta', registrarRutaController.postRuta);

module.exports = router;