const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

const eliminarUsuarioController = require('../controllers/eliminarUsuario.controller');

router.patch('/', verifyUserToken, eliminarUsuarioController.patchPerfil);

module.exports = router;