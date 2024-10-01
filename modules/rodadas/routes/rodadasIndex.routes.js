const express = require('express');
const router = express.Router();

const iniciarRodadaRoute = require('./iniciarRodada.routes');

router.use('/iniciarRodada', iniciarRodadaRoute);

module.exports = router;
