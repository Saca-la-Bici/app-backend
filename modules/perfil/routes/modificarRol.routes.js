const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middlewares/verifyToken');

const modificarRolController = require('../controllers/modificarRol.controller');

router.patch('/:id', verifyToken, modificarRolController.patchRole);

module.exports = router;