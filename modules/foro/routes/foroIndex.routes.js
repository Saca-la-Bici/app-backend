const express = require('express');
const router = express.Router();

const crearForoRoute = require('./crearForo.routes');

router.use('/crear', crearForoRoute);

module.exports = router;