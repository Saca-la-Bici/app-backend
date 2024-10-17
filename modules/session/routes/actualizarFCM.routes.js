const express = require('express');
const router = express.Router();

const verifyToken = require('../../../util/verifyUserToken')

const actualizarFCMController = require('../controllers/actualizarFCM.controller');

router.post('/', verifyToken, actualizarFCMController.actualizarFCM);

module.exports = router;