const express = require("express");
const router = express.Router();

const consultarPerfilRoute = require("./consultarPerfil.routes");
const modificarPerfilRoute = require("./modificarPerfil.routes");
const eliminarUsuarioRoute = require("./eliminarUsuario.routes");
const consultarUsuariosRoute = require("./consultarUsuarios.routes");
const buscarUsuariosRoute = require("./buscarUsuarios.routes");
const modificarRolRoute = require("./modificarRol.routes");
const consultarMedallasRoute = require("./consultarMedallas.routes");

// Importar y usar las rutas en el enrutador principal del módulo
router.use("/consultar", consultarPerfilRoute);
router.use("/modificar", modificarPerfilRoute);
router.use("/eliminar", eliminarUsuarioRoute);

//Importar y usar las rutas en el enrutador principal del módulo
router.use("/consultarUsuarios", consultarUsuariosRoute);
router.use("/buscarUsuarios", buscarUsuariosRoute);
router.use("/modificarRol", modificarRolRoute)

router.use("/consultarMedallas", consultarMedallasRoute);

module.exports = router;
