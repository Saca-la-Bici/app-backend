const express = require('express');
const router = express.Router();

// Importen aquí los archivos de ruta del módulo
// EJEMPLO: const registrarActividadRoute = require('./registrarActividad.routes');

// Pongan la ruta que quieren usar y el archivo de la ruta de la funcionalidad
// EJEMPLO router.use('/registrar', registrarActividadRoute);

const modificarPerfilController = require('../controllers/modificarPerfil.controller');

router.put('/', modificarPerfilController.put_modificarPerfil);

module.exports = router;

