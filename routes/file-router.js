const express = require('express');
const controller = require('../controllers/file-controller');
const router = express();

router.post('/', controller.UploadFile);
router.get('/', controller.GetFiles);

module.exports = router;