const express = require('express');
const router = express.Router();

const { getRodadas, getEventos, getTalleres } = require('../controllers/consultarActividades.controller');

router.get('/rodadas', getRodadas);
router.get('/eventos', getEventos);
router.get('/talleres', getTalleres);

module.exports = router;