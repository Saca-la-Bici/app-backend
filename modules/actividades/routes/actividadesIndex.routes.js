const express = require('express');
const router = express.Router();

const registrarActividadRoute = require('./registrarActividad.routes');
const modificarActividadRoute = require('./modificarActividad.routes');
const consultarActividadesRoute = require('./consultarActividades.routes');

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/registrar', registrarActividadRoute);
router.use('/modificar', modificarActividadRouteActividadRoute);
router.use('/consultar', consultarActividadesRoute);


module.exports = router;