const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken')
const { cancelarAsistencia } = require('../controllers/cancelarAsistencia.controller');

// Ruta para cancelar la asistencia de un usuario a una actividad
router.post('/cancelar', verifyUserToken, cancelarAsistencia);

module.exports = router;