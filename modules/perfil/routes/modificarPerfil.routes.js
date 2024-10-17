const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

const modificarPerfilController = require('../controllers/modificarPerfil.controller');

router.patch('/', verifyUserToken, modificarPerfilController.patchPerfil);

module.exports = router;