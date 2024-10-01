const express = require('express');
const router = express.Router();

const registrarUsuarioRoute = require('./registrarUsuario.routes');
const rolPrivilegioRoute = require('./rolPrivilegio.routes');
const getUserEmailRoute = require('./getUserEmail.routes');
const perfilCompletoRoute = require('./perfilCompleto.routes');
const getUsernameRoute = require('./getUsername.routes');
const actualizarFCMRoute = require('./actualizarFCM.routes');

router.use('/registrarUsuario', registrarUsuarioRoute);
router.use('/rolPrivilegio', rolPrivilegioRoute);
router.use('/getUserEmail', getUserEmailRoute);
router.use('/perfilCompleto', perfilCompletoRoute);
router.use('/getUsername', getUsernameRoute);
router.use('/actualizarTokenNotificacion', actualizarFCMRoute);

module.exports = router;