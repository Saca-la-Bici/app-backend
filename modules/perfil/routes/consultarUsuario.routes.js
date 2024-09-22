const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const consultarUsuariosController = require('../controllers/consultarUsuario.controller');

// Definir la ruta para crear una actividad
router.get('/', consultarUsuariosController.getUsuarios);


module.exports = router;