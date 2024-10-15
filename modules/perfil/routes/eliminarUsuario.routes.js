const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

const eliminarUsuarioController = require('../controllers/eliminarUsuario.controller');

router.delete('/', verifyUserToken, eliminarUsuarioController.deleteUser);

module.exports = router;