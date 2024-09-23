const express = require('express');
const router = express.Router();

const helperPregunta = require('../controllers/consultarPreguntaFrecuenteIndividual.controller');

router.get('/:IdPregunta', helperPregunta.get_PreguntaIndividual);
router.put('/:IdPregunta/Modificacion', helperPregunta.put_modificarPreguntaFrecuente);

module.exports = router;