const express = require('express');
const router = express.Router();

const registrarRolController = require('../controllers/registrarRol.controller');
const registrarPrivilegioController = require('../controllers/registrarPrivilegio.controller');
const registrarContieneController = require('../controllers/registrarContiene.controller');

router.post('/registrarRol', registrarRolController.registrarRol);
router.post('/registrarPrivilegio', registrarPrivilegioController.registrarPrivilegio);
router.get('/registrarContiene', registrarContieneController.registrarContiene);

module.exports = router;