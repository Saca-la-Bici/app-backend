const express = require('express');
const router = express.Router();

<<<<<<< HEAD
// Importen aquí los archivos de ruta del módulo
// EJEMPLO: const registrarActividadRoute = require('./registrarActividad.routes');
const publicarComentarioRoute = require('./publicarComentario.routes');
// Pongan la ruta que quieren usar y el archivo de la ruta de la funcionalidad
// EJEMPLO router.use('/registrar', registrarActividadRoute);
router.use('/comentario', publicarComentarioRoute);
<<<<<<< HEAD
=======
const crearForoRoute = require('./foroRouter.routes');

router.use('/crear', crearForoRoute);
router.use('/consultar', crearForoRoute)
>>>>>>> feature/0.1.1/20-consultarForo
=======
>>>>>>> 1d2eaead6eb4ccffee2bfd50f8d6a096b102caa8

module.exports = router;