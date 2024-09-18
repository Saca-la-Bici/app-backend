const express = require('express');
const router = express.Router();

const registrarActividadRoute = require('./registrarActividad.routes');
const modificarActividadRoute = require('./modificarActividad.routes');

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/registrar', registrarActividadRoute);
router.use('/modificar', modificarActividadRoute);


module.exports = router;