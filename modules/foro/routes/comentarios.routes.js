const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const registrarComentarioController = require('../controllers/registrarComentario.controller');
const modificarComentarioController = require('../controllers/modificarComentario.controller');
const eliminarComentarioController = require('../controllers/eliminarComentario.controller');

// Ruta para registrar un comentario
router.post('/registrar/:id', verifyUserToken, registrarComentarioController.registrarComentario);

// Ruta para modificar un comentario
router.patch('/modificar/:id', verifyUserToken, modificarComentarioController.modificarComentario);

// Ruta para eliminar un comentario
router.delete('/eliminar/:id', verifyUserToken, eliminarComentarioController.eliminarComentario);

module.exports = router;
