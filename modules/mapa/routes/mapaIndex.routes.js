const express = require('express');
const router = express.Router();

const modificarRutaRoute = require('./modificarRuta.routes');

router.use('/', modificarRutaRoute);

module.exports = router;