const express = require('express');
const router = express.Router();
// const verifyUserToken = require('../../../util/verifyUserToken');

const publicarComentario = require('../controllers/publicarComentario.controller');

router.post('/', publicarComentario.publicarComentario);

module.exports = router;