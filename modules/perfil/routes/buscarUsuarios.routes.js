const express = require("express");
const router = express.Router();

const verifyToken = require("../../../util/verifyUserToken");

// Importar el controlador que maneja la creación de actividades
const buscarUsuariosController = require("../controllers/buscarUsuarios.controller");

// Definir la ruta para crear una actividad
router.get("/", verifyToken, buscarUsuariosController.searchUsuarios);

module.exports = router;
