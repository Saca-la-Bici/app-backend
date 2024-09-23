const express = require('express');
const router = express.Router();

const registrarActividadRoute = require('./registrarActividad.routes');
const modificarActividadRoute = require('./modificarActividad.routes');
const consultarActividadesRoute = require('./consultarActividades.routes');
const inscripcionActividadRoute = require('./inscribirActividad.routes');// Nueva ruta de inscripción

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/registrar', registrarActividadRoute);
router.use('/modificar', modificarActividadRoute);
router.use('/consultar', consultarActividadesRoute);
router.use('/inscripcion', inscripcionActividadRoute); // ruta de inscripción

module.exports = router;