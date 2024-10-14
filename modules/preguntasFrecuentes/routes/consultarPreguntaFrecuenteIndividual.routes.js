const express = require('express');
const router = express.Router();

const getPreguntaIndividual = require('../controllers/consultarPreguntaFrecuenteIndividual.controller');

router.get('/:IdPregunta', getPreguntaIndividual.get_PreguntaIndividual);

module.exports = router;