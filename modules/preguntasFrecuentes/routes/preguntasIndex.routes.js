const express = require('express');
const router = express.Router();

const consultarPreguntasRoute = require('./consultarPreguntasFrecuentes.routes');
const consultarPreguntaIndividualRoute = require("./consultarPreguntaFrecuenteIndividual.routes");
const registrarPreguntasRoute = require('./registrarPreguntasFrecuentes.routes');
const modificarPreguntasRoute = require('./modificarPreguntaFrecuente.routes');
const eliminarPreguntasRoute = require('./eliminarPreguntaFrecuente.routes');

router.use('/consultar', consultarPreguntasRoute);  
router.use('/consultarIndividual', consultarPreguntaIndividualRoute);
router.use('/registrar', registrarPreguntasRoute);  
router.use('/modificar', modificarPreguntasRoute);
router.use('/eliminar', eliminarPreguntasRoute);

module.exports = router;