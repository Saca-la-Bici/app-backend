const express = require("express");
const router = express.Router();


const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const { consultarMedallas } = require("../controllers/consultarMedallas.controller");


// Definir la ruta para crear una medalla
router.get("/", verifyUserToken, verifyUserPermissions, consultarMedallas);

module.exports = router;