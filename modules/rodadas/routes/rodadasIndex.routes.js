const express = require('express');
const router = express.Router();

const iniciarRodadaRoute = require('./iniciarRodada.routes');
const obtenerUbicacionRoute = require('./obtenerUbicacion.routes');
const obtenerRodadaPorIdRoute = require('./obtenerRodadaPorId.routes');

router.use('/iniciarRodada', iniciarRodadaRoute);
router.use('/obtenerUbicacion', obtenerUbicacionRoute);
router.use('/obtenerRodadaPorId', obtenerRodadaPorIdRoute);

module.exports = router;
