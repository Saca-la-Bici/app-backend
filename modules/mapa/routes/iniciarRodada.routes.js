const express = require('express');
const router = express.Router();
const iniciarRodadaController = require('../controllers/iniciarRodadaController');

// Ruta para iniciar la rodada
router.post('/iniciar', iniciarRodadaController.iniciarRodada);

// Ruta para recibir y actualizar la ubicación del administrador
router.post('/ubicacion', iniciarRodadaController.actualizarUbicacion);

// Ruta opcional para obtener la ubicación actual del administrador
router.get('/ubicacion', iniciarRodadaController.obtenerUbicacion);

module.exports = router;
