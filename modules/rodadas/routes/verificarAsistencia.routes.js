const express = require('express');
const router = express.Router();

const verifyToken = require('../../../util/verifyUserToken')

const verificarAsistenciaController = require('../controllers/verificarAsistencia.controller');

router.patch('/', verifyToken, verificarAsistenciaController.verificarAsistencia);

module.exports = router;