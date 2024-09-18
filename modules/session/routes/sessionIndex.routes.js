const express = require('express');
const router = express.Router();

const registrarUsuarioRoute = require('./registrarUsuario.routes');
const rolPrivilegioRoute = require('./rolPrivilegio.routes');
const getUserEmailRoute = require('./getUserEmail.routes');
const perfilCompletoRoute = require('./perfilCompleto.routes');

router.use('/registrarUsuario', registrarUsuarioRoute);
router.use('/rolPrivilegio', rolPrivilegioRoute);
router.use('/getUserEmail', getUserEmailRoute);
router.use('/perfilCompleto', perfilCompletoRoute);

module.exports = router;