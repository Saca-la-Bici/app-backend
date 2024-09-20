const express = require('express');
const router = express.Router();

const consultarPreguntasRoute = require('./consultarPreguntasFrecuentes.routes');
const registrarPreguntasRoute = require('./registrarPreguntasFrecuentes.routes');
const consultarPreguntaIndividualRoute = require("./consultarPreguntaFrecuenteIndividual.routes");

router.use('/consultar', consultarPreguntasRoute);  
router.use('/registrar', registrarPreguntasRoute);  
router.use('/consultarIndividual', consultarPreguntaIndividualRoute);


module.exports = router;