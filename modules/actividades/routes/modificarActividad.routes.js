const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la modificación de actividades
const modificarActividadController = require('../controllers/modificarActividad.controller');

// Definir la ruta para modificar una actividad
router.post('/', modificarActividadController.postModificarActividadActividad);

module.exports = router;