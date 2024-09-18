const express = require('express');
const router = express.Router();

const registrarActividadRoute = require('./registrarActividad.routes');
const modificarActividadRoute = require('./modificarActividad.routes');
const inscripcionActividadRoute = require('./inscripcionActividad.routes');
const cancelarInscripcionActividadRoute = require('./cancelarInscripcionActividad.routes'); // Nueva ruta de cancelación

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/registrar', registrarActividadRoute);
router.use('/modificar', modificarActividadRoute);
router.use('/inscripcion', inscripcionActividadRoute);
router.use('/cancelar-inscripcion', cancelarInscripcionActividadRoute); // Añadir la ruta de cancelación

module.exports = router;
