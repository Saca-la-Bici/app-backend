const express = require("express");
const router = express.Router();

// Importar el controlador que maneja la creación de actividades
const consultarActividadesInscritasController = require("../controllers/consultarActividadesInscritas.controller");
const verifyUserToken = require("../../../util/verifyUserToken");

// Definir la ruta para crear una actividad
router.get("/",verifyUserToken, consultarActividadesInscritasController.get_ActividadesInscritas);

module.exports = router;
