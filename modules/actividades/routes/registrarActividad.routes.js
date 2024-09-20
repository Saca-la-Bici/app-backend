const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const registrarActividadController = require('../controllers/registrarActividad.controller');

// Definir la ruta para crear una actividad
router.get('/', registrarActividadController.getRegistrarActividad);
router.post('/:tipo', registrarActividadController.postRegistrarActividad);

module.exports = router;