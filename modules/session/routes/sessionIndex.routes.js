const express = require('express');
const router = express.Router();

const registrarUsuarioRoute = require('./registrarUsuario.routes');
const rolPrivilegioRoute = require('./rolPrivilegio.routes');
const getUserEmail = require('./getUserEmail.routes');

router.use('/registrarUsuario', registrarUsuarioRoute);
router.use('/rolPrivilegio', rolPrivilegioRoute);
router.use('/getUserEmail', getUserEmail);

module.exports = router;