const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');

const { getRodadas, getEventos, getTalleres } = require('../controllers/consultarActividades.controller');

router.get('/rodadas', verifyUserToken, getRodadas);
router.get('/eventos', verifyUserToken, getEventos);
router.get('/talleres', verifyUserToken, getTalleres);

module.exports = router;