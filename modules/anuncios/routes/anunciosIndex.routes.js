const express = require('express');
const router = express.Router();

const registrarAnuncioRoute = require('./registrarAnuncio.routes');
const consultarAnuncioRoute = require('./consultarAnuncio.routes');
const modificarAnuncioRoute = require('./modificarAnuncio.routes');
const eliminarAnuncioRoute = require('./eliminarAnuncio.routes');

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/registrar', registrarAnuncioRoute);
router.use('/consultar', consultarAnuncioRoute);
router.use('/modificar', modificarAnuncioRoute);
router.use('/eliminar', eliminarAnuncioRoute);

module.exports = router;