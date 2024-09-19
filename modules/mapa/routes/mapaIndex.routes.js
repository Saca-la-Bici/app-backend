const express = require('express');
const router = express.Router();

const registrarRutaRoute = require('./registrarRuta.routes');

router.use('/', registrarRutaRoute);

module.exports = router;