const express = require('express');
const router = express.Router();

const getUserEmailController = require('../controllers/getUserEmail.controller');

/**
 * Ruta para obtener la dirección de correo electrónico del usuario.
 */
router.get('/', getUserEmailController.getUserEmail);

module.exports = router;