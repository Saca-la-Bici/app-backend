const express = require('express');
const router = express.Router();

const verifyToken = require('../../../util/verifyUserToken')

const borrarFCMController = require('../controllers/borrarFCM.controller');

router.delete('/', verifyToken, borrarFCMController.eliminarFCM);

module.exports = router;