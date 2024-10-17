const express = require('express');
const router = express.Router();

const verifyToken = require('../../../util/verifyUserToken');

const registrarUsuarioController = require('../controllers/registrarUsuario.controller');

/**
 * Ruta para registrar un nuevo usuario.
 * 
 * - `verifyUserToken`: Verifica que el token del usuario sea válido.
 */
router.post('/', verifyToken, registrarUsuarioController.registrarUsuario);

module.exports = router;