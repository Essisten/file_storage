const express = require('express');
const controller = require('../controllers/street-controller');
const router = express();

router.get('/', controller.GetStreets);

module.exports = router;