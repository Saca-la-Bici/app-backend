const express = require("express");
const router = express.Router();

const verifyToken = require("../../../util/verifyUserToken");

// Importar el controlador que maneja la creación de actividades
const getAllRolesController = require("../controllers/getAllRoles.controller");

// Definir la ruta para crear una actividad
router.get("/", verifyToken, getAllRolesController.getAllRoles);

module.exports = router;
