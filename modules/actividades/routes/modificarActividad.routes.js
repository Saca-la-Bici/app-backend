const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

// Importar el controlador que maneja la modificación de actividades
const modificarActividadController = require('../controllers/modificarActividad.controller');

// Definir la ruta para modificar una actividad
router.post('/:id', verifyUserToken, modificarActividadController.postModificarActividad);

module.exports = router;