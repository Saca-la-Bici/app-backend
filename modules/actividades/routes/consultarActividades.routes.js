const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserRole = require('../../../util/verifyUserRole');

const { getRodadas, getEventos, getTalleres } = require('../controllers/consultarActividades.controller');

router.get('/rodadas', verifyUserToken, verifyUserRole, getRodadas);
router.get('/eventos', verifyUserToken, verifyUserRole, getEventos);
router.get('/talleres', verifyUserToken, verifyUserRole, getTalleres);

module.exports = router;