const express = require('express');
const router = express.Router();

const registrarActividadRoute = require('./registrarActividad.routes');
const modificarActividadRoute = require('./modificarActividad.routes');
const consultarActividadesRoute = require('./consultarActividades.routes');
const publicarComentarioRoute = require('./publicarComentario.routes');

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/registrar', registrarActividadRoute);
router.use('/modificar', modificarActividadRoute);
router.use('/consultar', consultarActividadesRoute);
router.use('/comentario', publicarComentarioRoute);

module.exports = router;