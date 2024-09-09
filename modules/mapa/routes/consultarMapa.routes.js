const express = require('express');
const router = express.Router();

 const consultarMapaController = require('../controllers/consultarMapa.controller');

router.get('/', consultarMapaController.getRutas);

module.exports = router;