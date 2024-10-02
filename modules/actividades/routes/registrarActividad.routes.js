const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken')

// Importar el controlador que maneja la creación de actividades
const registrarActividadController = require('../controllers/registrarActividad.controller');

// Definir la ruta para crear una actividad
router.post('/rodada', verifyUserToken, registrarActividadController.postRodada);
router.post('/taller', verifyUserToken, registrarActividadController.postTaller);
router.post('/evento', verifyUserToken, registrarActividadController.postEvento);

module.exports = router;