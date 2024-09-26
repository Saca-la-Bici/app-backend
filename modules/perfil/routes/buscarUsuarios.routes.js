const express = require("express");
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const buscarUsuariosController = require("../controllers/buscarUsuarios.controller");

// Definir la ruta para crear una actividad
router.get("/", buscarUsuariosController.searchUsuarios);

module.exports = router;
