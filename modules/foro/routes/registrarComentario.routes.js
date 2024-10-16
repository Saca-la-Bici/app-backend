const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const comentarioController = require('../controllers/comentario.controller');

// Ruta para registrar un comentario
router.post('/registrar', verifyUserToken, comentarioController.registrarComentario);

module.exports = router;
