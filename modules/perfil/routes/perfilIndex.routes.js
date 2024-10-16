const express = require("express");
const router = express.Router();

const consultarPerfilRoute = require("./consultarPerfil.routes");
const modificarPerfilRoute = require("./modificarPerfil.routes");
const eliminarUsuarioRoute = require("./eliminarUsuario.routes");
const consultarUsuariosRoute = require("./consultarUsuarios.routes");
const buscarUsuariosRoute = require("./buscarUsuarios.routes");
const modificarRolRoute = require("./modificarRol.routes");
const consultarMedallasRoute = require("./consultarMedallas.routes");
const getAllRolesRoute = require("./getAllRoles.routes");
const consultarUsuarioBuscadorRoute = require("./consultarUsuarioBuscador.routes");
const consultarActividadesInscritasRoute = require("./consultarActividadesInscritas.routes");

/**
 * Enrutador principal para las funcionalidades relacionadas con usuarios y perfiles.
 */

router.use("/consultar", consultarPerfilRoute);
router.use("/modificar", modificarPerfilRoute);
router.use("/eliminar", eliminarUsuarioRoute);

router.use("/consultarUsuarios", consultarUsuariosRoute);
router.use("/buscarUsuarios", buscarUsuariosRoute);
router.use("/modificarRol", modificarRolRoute)

router.use("/consultarMedallas", consultarMedallasRoute);
router.use("/getAllRoles", getAllRolesRoute);
router.use("/consultarUsuariosBuscador", consultarUsuarioBuscadorRoute);
router.use("/consultarActividadesInscritas", consultarActividadesInscritasRoute);

module.exports = router;
