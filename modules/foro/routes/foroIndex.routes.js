const express = require('express');
const router = express.Router();

const crearForoRoute = require('./foroRouter.routes');
const publicarComentarioRoute = require('./publicarComentario.routes');

router.use('/crear', crearForoRoute);
router.use('/consultar', crearForoRoute);
router.use('/publicar', publicarComentarioRoute);

module.exports = router;