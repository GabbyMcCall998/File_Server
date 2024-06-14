const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors());
const File = require('./models/File'); 

const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://gabrielandoh998:Godneverfails998@cluster0.qqwl67e.mongodb.net/File_Server');




// File Storage engine
const storage = multer.diskStorage({
    destination: './upload/files',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use('/files', express.static('upload/files'));

// Creating upload endpoint (ADMIN)
app.post("/upload", upload.single('file'), (req, res) => {
    try {
        const { title, category, description } = req.body;
        console.log(category)

        if (!req.file) {
            console.log("File upload failed: No file received");
            return res.status(400).json({ success: false, message: "File upload failed" });
        }

        console.log(`File received: ${req.file.filename}`);
        console.log(`Title: ${title}, Category: ${category}, Description: ${description}`);

        const file_download_url = `http://localhost:${port}/files/${req.file.filename}`;
        res.json({
            success: true,
            file_download_url: file_download_url,
        });
    } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});



// Endpoint for adding files to DB
app.post("/addfile", async (req, res) => {
    try {
        // Find all files in the database
        const lastFile = await File.find({});

        let id;

        // If there are files in the database, get the last file and increment its id by 1
        if (lastFile.length > 0) {
            let last_file_array = lastFile.slice(-1);
            let last_file = last_file_array[0];
            id = last_file.id + 1;
        } 
        // If there are no files, start with id 1
        else {
            id = 1;
        }

        // Create a new file object with the given details
        const newFile = new File({
            id: id,
            title: req.body.title,
            category: req.body.category,
            file_download_url: req.body.file_download_url,
            description: req.body.description
        });

        console.log(newFile);

        // Save the new file to the database
        await newFile.save();

        console.log("Saved");

        // Respond with a success message
        res.json({ success: true, message: 'File added successfully' });
    } catch (error) {
        // Log and respond with an error message in case of failure
        console.error("Error saving file:", error);
        res.status(500).json({ success: false, message: "Failed to add file to database" });
    }
});



// Endpoint for removing files
app.post('/fileremove', async (req, res) => {
    await File.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        success:true,
        title:req.body.title
    })
});



//Creating API for getting all Files
app.get('/allfiles',async(req,res)=>{
    const doc = await File.find({});
    console.log("All Files Fetched")
    res.send(doc)
})



app.listen(port, () => {
    console.log(`The app is running on port ${port}`);

});
