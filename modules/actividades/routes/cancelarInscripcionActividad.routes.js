const express = require('express');
const router = express.Router();
const { cancelarInscripcionUsuario } = require('../controllers/cancelarActividad.controller');

// Ruta para cancelar la inscripción de un usuario en una actividad
router.post('/cancelar', cancelarInscripcionUsuario);

module.exports = router;
