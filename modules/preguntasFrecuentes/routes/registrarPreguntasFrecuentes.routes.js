const express = require('express');
const router = express.Router();

const registrarPregunta = require('../controllers/registrarPreguntaFrecuente.controller');

router.post('/', registrarPregunta.post_registrarPreguntaFrecuente);

module.exports = router;