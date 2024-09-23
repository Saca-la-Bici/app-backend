const express = require('express');
const router = express.Router();

 const consultarMapaController = require('../controllers/consultarMapa.controller');

router.get('/', consultarMapaController.getRutas);

router.get('/:id', consultarMapaController.getRuta);

module.exports = router;