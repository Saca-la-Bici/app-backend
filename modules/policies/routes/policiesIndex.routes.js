const express = require('express');
const router = express.Router();

const privacyPolicyRoute = require('./privacyPolicy.routes');
const termsConditionsRoute = require('./termsConditions.routes');

// Importar y usar las rutas en el enrutador principal del módulo
router.use('/politicaPrivacidad', privacyPolicyRoute);
router.use('/terminosCondiciones', termsConditionsRoute);

module.exports = router;