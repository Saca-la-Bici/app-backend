const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const foroController  = require('../controllers/foroController.controller');

router.get('/:id', verifyUserToken, foroController.obtenerForoPorIdDeActividad);

module.exports = router;