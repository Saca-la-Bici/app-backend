const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

 const consultarMapaController = require('../controllers/consultarMapa.controller');

router.get('/',verifyUserToken,consultarMapaController.getRutas);

router.get('/:id', verifyUserToken, consultarMapaController.getRuta);

module.exports = router;