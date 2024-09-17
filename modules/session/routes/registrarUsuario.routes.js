const express = require('express');
const router = express.Router();

const registrarUsuarioController = require('../controllers/registrarUsuario.controller');

router.post('/', registrarUsuarioController.registrarUsuario);

module.exports = router;