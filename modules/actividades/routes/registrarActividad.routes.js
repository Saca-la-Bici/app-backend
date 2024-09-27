const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken')
const verifyUserRole = require('../../../util/verifyUserRole');

// Importar el controlador que maneja la creación de actividades
const registrarActividadController = require('../controllers/registrarActividad.controller');

// Definir la ruta para crear una actividad
router.post('/rodada', verifyUserToken, verifyUserRole, registrarActividadController.postRodada);
router.post('/taller', verifyUserToken, verifyUserRole, registrarActividadController.postTaller);
router.post('/evento', verifyUserToken, verifyUserRole, registrarActividadController.postEvento);

module.exports = router;