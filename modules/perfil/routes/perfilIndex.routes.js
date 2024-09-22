const express = require("express");
const router = express.Router();

const consultarUsuariosRoute = require("./consultarUsuarios.routes");
const buscarUsuariosRoute = require("./buscarUsuarios.routes");

//Importar y usar las rutas en el enrutador principal del módulo
router.use("/consultarUsuarios", consultarUsuariosRoute);
router.use("/buscarUsuarios", buscarUsuariosRoute);

module.exports = router;
