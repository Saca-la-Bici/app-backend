const express = require('express');
const router = express.Router();

const registrarRutaRoute = require('./registrarRuta.routes');
const modificarRutaRoute = require('./modificarRuta.routes');
const eliminarRutaRoute = require('./eliminarRuta.routes');
const consultarRutaRoute = require('./consultarMapa.routes');

router.use('/consultarRutas', consultarRutaRoute);

router.use('/', registrarRutaRoute);

router.use('/', modificarRutaRoute);

router.use('/', eliminarRutaRoute);

module.exports = router;
