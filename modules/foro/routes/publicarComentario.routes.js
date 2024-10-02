const express = require('express');
const router = express.Router();
// const verifyUserToken = require('../../../util/verifyUserToken');

const publicarComentarioController = require('../controllers/publicarComentario.controller');

router.post('/', publicarComentarioController.publicarComentario);

module.exports = router;