const express = require("express");
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const getPrivacyPolicyController = require("../controllers/getPrivacyPolicy.controller");

// Definir la ruta para crear una actividad
router.get("/", getPrivacyPolicyController.getPrivacyPolicy);

module.exports = router;
