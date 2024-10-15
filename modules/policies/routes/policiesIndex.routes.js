const express = require('express');
const router = express.Router();

const privacyPolicyRoute = require('./privacyPolicy.routes');

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/politicaPrivacidad', privacyPolicyRoute);

module.exports = router;