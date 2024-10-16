const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const ForoController  = require('../controllers/foroController.controller');

router.get('/:idDeActividad', verifyUserToken,ForoController.obtenerForoPorIdDeActividad);

module.exports = router;