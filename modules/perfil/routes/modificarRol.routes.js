const express = require('express');
const router = express.Router();

const verifyUserToken = require('../../../util/verifyUserToken');
const verifyUserPermissions = require('../../../util/verifyUserPermissions');
const { patchRole } = require('../controllers/modificarRol.controller');

router.patch('/:id', verifyUserToken, verifyUserPermissions, patchRole);

module.exports = router;