const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const { eliminarActividad } = require('../controllers/eliminarActividad.controller');

router.patch('/', verifyUserToken, eliminarActividad);

module.exports = router;