const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

const eliminarComentarioController = require('../controllers/eliminarComentario.controller');

router.delete('/:idComentario', verifyUserToken, eliminarComentarioController.eliminarComentario);

module.exports = router;