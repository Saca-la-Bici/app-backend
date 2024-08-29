const express = require('express');
const router = express.Router();

const registrarActividadRoute = require('./registrarActividad.routes');

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/registrar', registrarActividadRoute);

module.exports = router;