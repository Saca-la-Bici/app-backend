const express = require('express');
const router = express.Router();

const registrarActividadRoute = require('./registrarActividad.routes');
const modificarActividadRoute = require('./modificarActividad.routes');
const consultarActividadesRoute = require('./consultarActividades.routes');

router.use('/consultar', consultarActividadesRoute);
router.use('/registrar', registrarActividadRoute);
router.use('/modificar', modificarActividadRoute);


module.exports = router;