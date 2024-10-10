const express = require("express");
const router = express.Router();

const verifyToken = require("../../../util/verifyUserToken");

// Importar el controlador que maneja la creación de actividades
const consultarUsuariosController = require("../controllers/consultarUsuarios.controller");

// Definir la ruta para crear una actividad
router.get("/", verifyToken, consultarUsuariosController.getUsuarios);

module.exports = router;
