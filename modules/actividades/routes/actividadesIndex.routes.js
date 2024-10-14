const express = require('express');
const router = express.Router();

const registrarActividadRoute = require('./registrarActividad.routes');
const modificarActividadRoute = require('./modificarActividad.routes');
const consultarActividadesRoute = require('./consultarActividades.routes');
<<<<<<< HEAD
const publicarComentarioRoute = require('../../foro/routes/publicarComentario.routes');
=======
const inscripcionActividadRoute = require('./inscribirActividad.routes');// Nueva ruta de inscripción
const cancelarAsistenciaRoute = require('./cancelarAsistencia.routes');
const eliminarActividadRoute = require('./eliminarActividad.routes');
>>>>>>> feature/0.1.1/20-consultarForo

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/registrar', registrarActividadRoute);
router.use('/modificar', modificarActividadRoute);
router.use('/consultar', consultarActividadesRoute);
router.use('/inscripcion', inscripcionActividadRoute); // ruta de inscripción
router.use('/cancelarAsistencia', cancelarAsistenciaRoute);
router.use('/eliminar', eliminarActividadRoute);

module.exports = router;