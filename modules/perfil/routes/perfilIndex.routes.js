const express = require('express');
const router = express.Router();

const consultarUsuariosRoute = require('./consultarUsuario.routes');

//Importar y usar las rutas en el enrutador principal del módulo
router.use('/consultarUsuarios', consultarUsuariosRoute);

module.exports = router;