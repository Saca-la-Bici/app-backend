const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');

// Importar el controlador que maneja la modificación de actividades
const modificarActividadController = require('../controllers/modificarActividad.controller');

// Definir la ruta para modificar una actividad
router.post('/:id', verifyUserToken, verifyUserPermissions, modificarActividadController.postModificarActividad);

module.exports = router;