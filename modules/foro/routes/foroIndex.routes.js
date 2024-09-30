const express = require('express');
const router = express.Router();

// Importen aquí los archivos de ruta del módulo
// EJEMPLO: const registrarActividadRoute = require('./registrarActividad.routes');
const publicarComentarioRoute = require('./publicarComentario.routes');
// Pongan la ruta que quieren usar y el archivo de la ruta de la funcionalidad
// EJEMPLO router.use('/registrar', registrarActividadRoute);
router.use('/comentario', publicarComentarioRoute);

module.exports = router;