const express = require('express');
const router = express.Router();

const consultarForoRoute = require('./foroRouter.routes');
const comentariosRoute = require('./comentarios.routes');

// Rutas para la creación y consulta de foros
router.use('/consultar', consultarForoRoute); // Ruta para consultar foros

// Ruta para registrar comentarios
router.use('/comentarios', comentariosRoute); // Ruta para registrar y gestionar comentarios

module.exports = router;
