const express = require('express');
const router = express.Router();

const crearForoRoute = require('./foroRouter.routes');

router.use('/crear', crearForoRoute);
router.use('/consultar', crearForoRoute)

module.exports = router;