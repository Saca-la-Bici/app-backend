const express = require('express');
const router = express.Router();

const consultarRutaRoute = require('./consultarMapa.routes');
const registrarRutaRoute = require('./registrarRuta.routes');

router.use('/', registrarRutaRoute);
router.use('/consultarRutas', consultarRutaRoute);
module.exports = router;