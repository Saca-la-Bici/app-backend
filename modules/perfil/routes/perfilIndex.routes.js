const express = require('express');
const router = express.Router();

// Importen aquí los archivos de ruta del módulo
// EJEMPLO: const registrarActividadRoute = require('./registrarActividad.routes');

// Pongan la ruta que quieren usar y el archivo de la ruta de la funcionalidad
// EJEMPLO router.use('/registrar', registrarActividadRoute);



const consultarPerfilRoutes = require('./consultarPerfil.routes');
const modificarPerfilRoutes = require('./modificarPerfil.routes');


router.get('/consultar', consultarPerfilRoutes)
router.get('/modificar', modificarPerfilRoutes)

module.exports = router;