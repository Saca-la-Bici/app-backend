const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const obtenerRodadaPorIdController = require('../controllers/obtenerRodadaPorId.controller');

// Ruta para obtener los datos de una ruta dentro de una rodada
router.get('/:rodadaId', verifyUserToken, verifyUserPermissions, obtenerRodadaPorIdController.getRodadaYRutaPorActividad);

module.exports = router;