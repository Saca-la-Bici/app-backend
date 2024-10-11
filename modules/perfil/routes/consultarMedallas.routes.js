const express = require("express");
const router = express.Router();

// Importar el controlador que maneja la creación de medallas
const consultarMedallasController = require("../controllers/consultarMedallas.controller");
const verifyUserToken = require("../../../util/verifyUserToken");

// Definir la ruta para crear una medalla
router.get("/",verifyUserToken, consultarMedallasController.consultarMedallas);

module.exports = router;