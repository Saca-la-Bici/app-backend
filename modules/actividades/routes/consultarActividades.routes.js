const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');

const { getRodadas, getEventos, getTalleres, getActividad } = require('../controllers/consultarActividades.controller');

router.get('/rodadas', verifyUserToken, verifyUserPermissions, getRodadas);
router.get('/eventos', verifyUserToken, verifyUserPermissions, getEventos);
router.get('/talleres', verifyUserToken, verifyUserPermissions, getTalleres);
router.get('/', verifyUserToken, verifyUserPermissions, getActividad);



module.exports = router;