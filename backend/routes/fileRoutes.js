const express = require('express');
const fileController = require('../controllers/fileController');

const router = express.Router();



router.get('/download/:id', fileController.downloadFile);
router.get('/search', fileController.searchFiles);
router.post('/sendfile', fileController.sendFile);

module.exports = router;
