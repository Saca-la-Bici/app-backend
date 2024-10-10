const express = require('express');
const router = express.Router();
const { inscribirUsuario } = require('../controllers/inscribirActividad.controller');
const verifyUserToken = require('../../../util/verifyUserToken')

// Ruta para inscribir a un usuario en una actividad
router.post('/inscribir', verifyUserToken, inscribirUsuario);

module.exports = router;
