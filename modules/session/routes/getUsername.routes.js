const express = require('express');
const router = express.Router();

const getUsernameController = require('../controllers/getUsername.controller');

/**
 * Ruta para obtener el nombre de usuario.
 */
router.get('/', getUsernameController.getUsername);

module.exports = router;