const express = require("express");
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const consultarPerfilController = require("../controllers/consultarPerfil.controller");

// Definir la ruta para crear una actividad
router.get("/:firebaseUID", consultarPerfilController.get_Perfil);

module.exports = router;
