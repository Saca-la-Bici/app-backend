const express = require('express');
const router = express.Router();

const crearForoRoute = require('./foroRouter.routes');
const comentarioRoute = require('./registrarComentario.routes');

// Rutas para la creación y consulta de foros
router.use('/crear', crearForoRoute); // Ruta para crear un foro
router.use('/consultar', crearForoRoute); // Ruta para consultar foros

// Ruta para registrar comentarios
router.use('/comentarios', comentarioRoute); // Ruta para registrar y gestionar comentarios

module.exports = router;
