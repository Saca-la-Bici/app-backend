const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');

const consultarMapaController = require('../controllers/consultarMapa.controller');

router.get('/',verifyUserToken, verifyUserPermissions,consultarMapaController.getRutas);

router.get('/:id', verifyUserToken, verifyUserPermissions, consultarMapaController.getRuta);

module.exports = router;