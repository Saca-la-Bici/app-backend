const express = require('express');
const router = express.Router();

const verifyToken = require('../../../util/verifyUserToken');

const perfilCompletoController = require('../controllers/perfilCompleto.controller');

router.get('/', verifyToken, perfilCompletoController.perfilCompleto);

module.exports = router;