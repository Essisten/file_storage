const express = require('express');
const file_router = require('./file-router');
const street_router = require('./street-router');
const stats_router = require('./stats-router');
const router = express();

router.use('/files', file_router);
router.use('/street', street_router);
router.use('/stats', stats_router);

module.exports = router;