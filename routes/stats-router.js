const express = require('express');
const controller = require('../controllers/street-controller');
const router = express();

router.get('/', controller.GetStats);

module.exports = router;