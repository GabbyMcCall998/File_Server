const port = 5000;
const express= require('express')
const auth = require("./routes/auth")
const File = require('./models/File')
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")
const multer = require("multer")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/auth", auth);0

// Dataabase Connection with MongoDB
mongoose.connect("mongodb+srv://gabrielandoh998:Godneverfails998@cluster0.qqwl67e.mongodb.net/File_Server")


// File Storage engine
const storage= multer.diskStorage({
    destination:'./upload/files',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


//creating the upload function
const upload = multer({storage:storage})

// Creating upload endpoint
app.use('/files', express.static('upload/files'));
app.post("/upload", upload.single('record'), (req, res) => {
    // Handle error if file upload fails
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "File upload failed" });
    }

    // Construct file download URL with category (or default to 'uncategorized')
    const category = req.body.category || 'uncategorized';
    const file_download_url = `http://localhost:${port}/files/${category}/${req.file.filename}`;

    res.json({
        success: 1,
        file_download_url: file_download_url,
        category: category
    });
});


//Endpoint for adding files to db
app.post('/addfile', async (req, res) => {
    try {
        const newFile = new File({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            file_download_url: req.body.file_download_url,
         });

         console.log(newFile)
        await newFile.save();

        console.log("File saved successfully");

        res.json({
            success: true,
            title: req.body.title
        });
    } catch (error) {
        console.error("Error saving file:", error);
        res.status(500).json({ success: false, message: "Failed to add file to database" });
    }
});



app.get("/", (req,res) =>{
    res.send('hi am alive and kicking butts')

})


app.listen(port, ()=>{
    console.log('The app is running on port 5000')
})