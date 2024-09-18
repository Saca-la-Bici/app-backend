const express = require('express');
const router = express.Router();

const consultarRutaRoute = require('./consultarMapa.routes');

router.use('/consultarRutas', consultarRutaRoute);

module.exports = router;