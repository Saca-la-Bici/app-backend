const express = require('express');
const router = express.Router();

const modificarRolController = require('../controllers/modificarRol.controller');

router.get('/', modificarRolController.modificarRol);

module.exports = router;