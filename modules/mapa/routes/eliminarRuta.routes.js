const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

// Importar el controlador que maneja la eliminación de rutas
const eliminarRutaController = require('../controllers/eliminarRuta.controller');

// Definir la ruta para eliminar una ruta
router.put('/eliminarRuta/:id', verifyUserToken, eliminarRutaController.eliminarRuta);

module.exports = router;