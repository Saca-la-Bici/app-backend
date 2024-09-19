
const express = require('express');
const router = express.Router();
const { inscribirUsuario } = require('../controllers/inscribirActividad.controller');

// Ruta para inscribir a un usuario en una actividad
router.post('/inscribir', inscribirUsuario);

module.exports = router;

