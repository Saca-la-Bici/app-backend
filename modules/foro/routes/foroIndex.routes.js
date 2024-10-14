const express = require('express');
const router = express.Router();

const crearForoRoute = require('./foroRouter.routes');
const eliminarComentarioRoute = require('./eliminarComentario.routes');

router.use('/crear', crearForoRoute);
router.use('/consultar', crearForoRoute);
router.use('/eliminar', eliminarComentarioRoute);

module.exports = router;