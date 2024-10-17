const express = require("express");
const router = express.Router();

const verifyToken = require("../../../util/verifyUserToken");

// Importar el controlador que maneja la creación de actividades
const consultarUsuariosController = require("../controllers/consultarUsuarios.controller");

/**
 * Enrutador para consultar usuarios.
 * 
 * Ruta principal:
 * - `GET /`: Recupera la lista de usuarios.
 * 
 * - `verifyToken`: Verifica que el token del usuario sea válido para acceder a la ruta.
 */
router.get("/", verifyToken, consultarUsuariosController.getUsuarios);

module.exports = router;
