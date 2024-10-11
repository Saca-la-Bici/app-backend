const express = require('express');
const router = express.Router();

const iniciarRodadaRoute = require('./iniciarRodada.routes');
const obtenerUbicacionRoute = require('./obtenerUbicacion.routes');
const obtenerRodadaPorIdRoute = require('./obtenerRodadaPorId.routes');
const verificarAsistenciaRoute = require('./verificarAsistencia.routes');

router.use('/iniciarRodada', iniciarRodadaRoute);
router.use('/obtenerUbicacion', obtenerUbicacionRoute);
router.use('/obtenerRodadaPorId', obtenerRodadaPorIdRoute);
router.use('/verificarAsistencia', verificarAsistenciaRoute);

module.exports = router;
