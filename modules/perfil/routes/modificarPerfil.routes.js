const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

// Importen aquí los archivos de ruta del módulo
// EJEMPLO: const registrarActividadRoute = require('./registrarActividad.routes');

// Pongan la ruta que quieren usar y el archivo de la ruta de la funcionalidad
// EJEMPLO router.use('/registrar', registrarActividadRoute);

const modificarPerfilController = require('../controllers/modificarPerfil.controller');

router.patch('/', verifyUserToken, modificarPerfilController.patchPerfil);

module.exports = router;