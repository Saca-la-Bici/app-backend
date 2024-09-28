const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

// Importar el controlador que maneja la creación de actividades
const registrarRutaController = require('../controllers/registrarRuta.controller');

// Definir la ruta para crear una actividad
router.post('/registrarRuta', verifyUserToken, registrarRutaController.postRuta);

module.exports = router;