const express = require('express');
const router = express.Router();
const iniciarRodadaController = require('../controllers/iniciarRodada.controller');

// Ruta para actualizar la ubicación de una rodada existente
router.put('/:idRodada', iniciarRodadaController.actualizarUbicacion);

module.exports = router;
