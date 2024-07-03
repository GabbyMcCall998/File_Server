const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const File = require('../models/File');
const User = require('../models/User');



const port = 5000


//File upload Engine
const storage = multer.diskStorage({
    destination: './upload/files',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

exports.upload=upload.single('file');


// Creating upload  (ADMIN)
exports.uploadFile = async (req, res) => {
    try {
        const { title, category, description } = req.body;

        if (!req.file) {
            console.log("File upload failed: No file received");
            return res.status(400).json({ success: false, message: "File upload failed" });
        }

        console.log(`File received: ${req.file.filename}`);
        console.log(`Title: ${title}, Category: ${category}, Description: ${description}`);

        const file_download_url = `http://localhost:${port}/files/${req.file.filename}`;
        const file_path = `./upload/files/${req.file.filename}`;

        console.log(`File path: ${file_path}`);

        res.json({
            success: true,
            file_download_url: file_download_url,
            file_path: file_path,
            title: title,
            category: category,
            description: description
        });
    } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
    


// Endpoint for adding files to DB
exports.addFile = async (req, res) => {
try {
    const lastFile = await File.find({}).sort({ id: -1 }).limit(1);
    const id = lastFile.length > 0 ? lastFile[0].id + 1 : 1;

    const newFile = new File({
        id: id,
        title: req.body.title,
        category: req.body.category,
        file_download_url: req.body.file_download_url,
        description: req.body.description,
        file_path: req.body.file_path
    });

    await newFile.save();

    res.json({ success: true, message: 'File added successfully' });
} catch (error) {
    console.error("Error saving file:", error);
    res.status(500).json({ success: false, message: "Failed to add file to database" });
}
};


// Endpoint for removing files
exports.removeFile = async (req, res) => {
    await File.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        success:true,
        title:req.body.title
    })
}


//Endpoint for Getting all files
exports.getAllFiles = async (req, res) => {
    const files = await File.find({});
    res.json(files);
};


