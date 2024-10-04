const express = require('express');
const router = express.Router();

const verifyToken = require('../../../util/verifyUserToken');

const registrarUsuarioController = require('../controllers/registrarUsuario.controller');

router.post('/', verifyToken, registrarUsuarioController.registrarUsuario);

module.exports = router;