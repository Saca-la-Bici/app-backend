const express = require('express');
const router = express.Router();

const registrarAnuncioRoute = require('./registrarAnuncio.routes');

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/registrar', registrarAnuncioRoute);

module.exports = router;