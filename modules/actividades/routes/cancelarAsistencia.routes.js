const express = require('express');
const router = express.Router();

const { cancelarAsistencia } = require('../controllers/cancelarAsistencia.controller');

// Ruta para cancelar la asistencia de un usuario a una actividad
router.post('/cancelar', cancelarAsistencia);

module.exports = router;