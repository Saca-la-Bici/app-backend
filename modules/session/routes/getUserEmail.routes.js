const express = require('express');
const router = express.Router();

const getUserEmailController = require('../controllers/getUserEmail.controller');

router.get('/', getUserEmailController.getUserEmail);

module.exports = router;