const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const { patchRole } = require('../controllers/modificarRol.controller');

/**
 * Enrutador para modificar roles de usuarios.
 * 
 * Ruta principal:
 * - `PATCH /:id`: Modificar el rol de un usuario específico.
 * 
 * - `verifyUserToken`: Verifica que el token del usuario sea válido.
 * - `verifyUserPermissions`: Verifica que el usuario tenga permisos suficientes para modificar roles.
 */

router.patch('/:id', verifyUserToken, verifyUserPermissions, patchRole);

module.exports = router;