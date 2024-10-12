const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const ForoController  = require('../controllers/foroController.controller');

router.post('/', verifyUserToken,ForoController.crearForo);
router.get('/:idDeActividad', ForoController.obtenerForoPorIdDeActividad);

module.exports = router;