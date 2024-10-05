const express = require('express');
const router = express.Router();

const iniciarRodadaRoute = require('./iniciarRodada.routes');
const obtenerUbicacionRoute = require('./obtenerUbicacion.routes');

router.use('/iniciarRodada', iniciarRodadaRoute);
router.use('/obtenerUbicacion', obtenerUbicacionRoute);

module.exports = router;
