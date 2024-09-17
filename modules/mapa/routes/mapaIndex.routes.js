const express = require('express');
const router = express.Router();

const registrarRutaRoute = require('./registrarRuta.routes');
const modificarRutaRoute = require('./modificarRuta.routes');
const consultarRutaRoute = require('./consultarMapa.routes');

router.use('/', registrarRutaRoute);
router.use('/', modificarRutaRoute);
router.use('/consultarRutas', consultarRutaRoute);

module.exports = router;