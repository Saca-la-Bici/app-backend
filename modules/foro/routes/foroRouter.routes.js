const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const ForoController  = require('../controllers/foroController.controller');

router.post('/idDeActividad', verifyUserToken,ForoController.crearForo);
router.get('/:idDeActividad', verifyUserToken,ForoController.obtenerForoPorIdDeActividad);

module.exports = router;