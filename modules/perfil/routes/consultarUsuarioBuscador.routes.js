const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const consultarUsuarioBuscador = require('../controllers/consultarUsuarioBuscador.controller');

router.get('/', verifyUserToken, consultarUsuarioBuscador.getConsultarPerfilBuscador);

module.exports = router;