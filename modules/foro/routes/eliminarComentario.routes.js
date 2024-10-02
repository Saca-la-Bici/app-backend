const express = require('express');
const router = express.Router();

const eliminarComentarioController = require('../controllers/eliminarComentario.controller');

router.delete('/:idComentario', eliminarComentarioController.eliminarComentario);

module.exports = router;