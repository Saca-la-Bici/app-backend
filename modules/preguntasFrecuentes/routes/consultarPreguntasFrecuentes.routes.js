const express = require('express');
const router = express.Router();

const consultarPreguntas = require('../controllers/consultarPreguntasFrecuentes.controller');

router.get('/', consultarPreguntas.get_PreguntasFrecuentes);

module.exports = router;