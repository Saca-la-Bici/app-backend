const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const { consultarPreguntasFrecuentes } = require('../controllers/consultarPreguntasFrecuentes.controller');

router.get('/', verifyUserToken, verifyUserPermissions, consultarPreguntasFrecuentes);

module.exports = router;