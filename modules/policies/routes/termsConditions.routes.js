const express = require("express");
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const getTermsConditionsController = require("../controllers/getTermsConditions.controller");

// Definir la ruta para crear una actividad
router.get("/", getTermsConditionsController.getTermsConditions);

module.exports = router;
