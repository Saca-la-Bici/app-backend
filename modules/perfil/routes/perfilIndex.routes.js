const express = require('express');
const router = express.Router();

const modificarRolRoute = require('./modificarRol.routes.js');

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/modificar', modificarRolRoute);

module.exports = router;