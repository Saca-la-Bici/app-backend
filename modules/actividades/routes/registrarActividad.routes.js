const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken')
const verifyUserPermissions = require('../../../util/verifyUserPermissions');

// Importar el controlador que maneja la creación de actividades
const registrarActividadController = require('../controllers/registrarActividad.controller');

// Definir la ruta para crear una actividad
router.post('/rodada', verifyUserToken, verifyUserPermissions, registrarActividadController.postRodada);
router.post('/taller', verifyUserToken, verifyUserPermissions, registrarActividadController.postTaller);
router.post('/evento', verifyUserToken, verifyUserPermissions, registrarActividadController.postEvento);

module.exports = router;