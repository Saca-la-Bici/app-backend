const express = require('express');
const router = express.Router();

const registrarUsuarioRoute = require('./registrarUsuario.routes');

router.use('/registrarUsuario', registrarUsuarioRoute);

module.exports = router;