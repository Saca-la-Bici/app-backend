const express = require("express");
const router = express.Router();

// Importar el controlador que maneja la creación de medallas
const consultarMedallasController = require("../controllers/consultarMedallas.controller");

// Definir la ruta para crear una medalla
router.get("/", consultarMedallasController.getMedallas);

module.exports = router;
