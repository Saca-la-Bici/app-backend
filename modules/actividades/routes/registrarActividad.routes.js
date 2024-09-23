const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const registrarActividadController = require('../controllers/registrarActividad.controller');

// Definir la ruta para crear una actividad
router.post('/rodada', registrarActividadController.postRodada);
router.post('/taller', registrarActividadController.postTaller);
router.post('/evento', registrarActividadController.postEvento);

module.exports = router;