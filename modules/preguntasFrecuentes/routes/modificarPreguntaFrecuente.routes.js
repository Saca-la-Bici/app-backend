const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const modificarPreguntaFrecuente = require('../controllers/modificarPreguntaFrecuente.controller');

router.put('/:IdPregunta', modificarPreguntaFrecuente.put_modificarPreguntaFrecuente);

//, verifyUserToken, verifyUserPermissions
module.exports = router;