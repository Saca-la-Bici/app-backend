const express = require('express');
const router = express.Router();

<<<<<<< HEAD
// Importen aquí los archivos de ruta del módulo
// EJEMPLO: const registrarActividadRoute = require('./registrarActividad.routes');
const publicarComentarioRoute = require('./publicarComentario.routes');
const eliminarComentarioRoute = require('./eliminarComentario.routes');

// Pongan la ruta que quieren usar y el archivo de la ruta de la funcionalidad
// EJEMPLO router.use('/registrar', registrarActividadRoute);
router.use('/comentario', publicarComentarioRoute);
router.use('/eliminar', eliminarComentarioRoute);
=======
const crearForoRoute = require('./foroRouter.routes');

router.use('/crear', crearForoRoute);
router.use('/consultar', crearForoRoute)
>>>>>>> feature/0.1.1/20-consultarForo

module.exports = router;