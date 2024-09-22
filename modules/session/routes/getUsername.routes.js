const express = require('express');
const router = express.Router();

const getUsernameController = require('../controllers/getUsername.controller');

router.get('/', getUsernameController.getUsername);

module.exports = router;