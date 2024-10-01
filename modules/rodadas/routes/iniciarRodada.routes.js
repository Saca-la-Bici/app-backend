const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const iniciarRodadaController = require('../controllers/iniciarRodada.controller');

// Ruta para actualizar la ubicación de una rodada existente
router.put('/:idRodada', verifyUserToken, verifyUserPermissions, iniciarRodadaController.actualizarUbicacion);

module.exports = router;
