const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const { eliminarPreguntaFrecuente } = require('../controllers/eliminarPreguntaFrecuente.controller');

router.delete('/:IdPregunta', verifyUserToken, verifyUserPermissions, eliminarPreguntaFrecuente);

module.exports = router;