const express = require("express");
const router = express.Router();

const verifyToken = require("../../../util/verifyUserToken");

// Importar el controlador que maneja la creación de actividades
const consultarEstadisticasMesController = require("../controllers/consultarEstadisticasMes.controller");

// Definir la ruta para crear una actividad
router.get("/", consultarEstadisticasMesController.getEstadisticasMes);

module.exports = router;