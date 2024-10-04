const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

// Importar el controlador que maneja la modificación de actividades
const modificarActividadController = require('../controllers/modificarActividad.controller');

// Definir la ruta para modificar una actividad
router.patch('/:id', verifyUserToken, modificarActividadController.patchModificarActividad);

module.exports = router;