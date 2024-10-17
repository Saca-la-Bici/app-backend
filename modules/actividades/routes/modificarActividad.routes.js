const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

// Importar el controlador que maneja la modificación de actividades
const modificarActividadController = require('../controllers/modificarActividad.controller');

// Definir la ruta para modificar una actividad
router.patch('/taller', verifyUserToken, modificarActividadController.patchTaller);
router.patch('/evento', verifyUserToken, modificarActividadController.patchEvento);
router.patch('/rodada', verifyUserToken, modificarActividadController.patchRodada);

module.exports = router;