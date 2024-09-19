const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la modificacion de rutas
const modificarRutaController = require('../controllers/modificarRuta.controller');

// Definir la ruta para modificar una ruta
router.put('/modificarRuta/:id', modificarRutaController.modificarRuta);

module.exports = router;