const express = require('express');
const router = express.Router();

const registrarUsuarioRoute = require('./registrarUsuario.routes');
const rolPrivilegioRoute = require('./rolPrivilegio.routes');

router.use('/registrarUsuario', registrarUsuarioRoute);
router.use('/rolPrivilegio', rolPrivilegioRoute);

module.exports = router;