const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');

// Importar el controlador que maneja la creación de actividades
const consultarAnuncioController = require('../controllers/consultarAnuncio.controller');

// Definir la ruta para crear una actividad
router.get('/', verifyUserToken, verifyUserPermissions, consultarAnuncioController.getAnnouncements);

module.exports = router;