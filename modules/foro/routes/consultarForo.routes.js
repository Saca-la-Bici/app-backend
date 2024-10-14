const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

// Importar el controlador que maneja la Funcionalidad que quieres
// EJEMPLO: const registrarAnuncioController = require('../controllers/registrarAnuncio.controller');
const consultarForoController = require('../controllers/consultarForo.controller');
// Definir la ruta para la funcionalidad y la funcion del controlador
// EJEMPLO: router.get('/', registrarActividadController.getPrueba);
router.get('/:actividadId', verifyUserToken, consultarForoController.getComentarios);

module.exports = router;