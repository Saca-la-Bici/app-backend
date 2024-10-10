const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const { registrarPreguntaFrecuente } = require('../controllers/registrarPreguntaFrecuente.controller')

router.post('/', verifyUserToken, verifyUserPermissions, registrarPreguntaFrecuente);

module.exports = router;