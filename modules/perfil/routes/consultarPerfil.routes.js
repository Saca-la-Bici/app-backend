const express = require("express");
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const consultarPerfilController = require("../controllers/consultarPerfil.controller");
const verifyUserToken = require("../../../util/verifyUserToken");

// Definir la ruta para crear una actividad
router.get("/", verifyUserToken, consultarPerfilController.get_Perfil);

module.exports = router;
