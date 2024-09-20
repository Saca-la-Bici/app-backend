const express = require('express');
const router = express.Router();

const consultarPerfilRoute = require('./consultarPerfil.routes');
const modificarPerfilRoute = require('./modificarPerfil.routes');

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/consultar', consultarPerfilRoute)
router.use('/modificar', modificarPerfilRoute)

module.exports = router;