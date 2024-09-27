const express = require('express');
const router = express.Router();

const modificarRolController = require('../controllers/modificarRol.controller');

router.patch('/:id', modificarRolController.patchRole);

module.exports = router;