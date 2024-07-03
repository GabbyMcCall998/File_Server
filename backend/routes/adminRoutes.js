const express = require('express');
const path = require('path');
const multer = require('multer');
const adminFileController = require('../controllers/adminFileController');

const router = express.Router();



const storage = multer.diskStorage({
    destination: './upload/files',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

exports.upload=upload.single('file');


router.post('/upload', upload.single('file'), adminFileController.uploadFile);
router.post('/addfile', adminFileController.addFile);
router.post('/fileremove',adminFileController.removeFile);
router.get('/allfiles',adminFileController.getAllFiles);



module.exports = router;
