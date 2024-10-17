const express = require("express");
const router = express.Router();

const verifyToken = require("../../../util/verifyUserToken");

// Importar el controlador que maneja la creación de actividades
const buscarUsuariosController = require("../controllers/buscarUsuarios.controller");

/**
 * Enrutador para buscar usuarios.
 * 
 * Ruta principal:
 * - `GET /`: Recupera la lista de usuarios que coincidan con el criterio de búsqueda.
 * 
 * - `verifyToken`: Verifica que el token del usuario sea válido para acceder a la ruta.
 */
router.get("/", verifyToken, buscarUsuariosController.searchUsuarios);

module.exports = router;
