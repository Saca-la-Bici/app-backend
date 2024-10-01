const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const consultarAnuncioController = require('../controllers/consultarAnuncio.controller');


router.get('/', verifyUserToken, verifyUserPermissions, consultarAnuncioController.getAnnouncements);



module.exports = router;