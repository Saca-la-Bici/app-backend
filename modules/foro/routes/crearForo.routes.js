const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const crearForoController  = require('../controllers/crearForo.controller');

router.post('/', verifyUserToken,crearForoController.crearForo);

module.exports = router;