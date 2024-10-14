const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const eliminarUbicacionController = require('../controllers/eliminarUbicacion.controller');

// Ruta para eliminar la ubicación de una rodada existente
router.delete('/:idRodada', verifyUserToken, verifyUserPermissions, eliminarUbicacionController.eliminarUbicacion);

module.exports = router;