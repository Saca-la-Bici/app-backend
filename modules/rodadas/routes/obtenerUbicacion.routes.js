const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const obtenerUbicacionController = require('../controllers/obtenerUbicacion.controller');

// Ruta para actualizar la ubicación de una rodada existente
router.get('/:idRodada', verifyUserToken, verifyUserPermissions, obtenerUbicacionController.getUbicacionById);

module.exports = router;