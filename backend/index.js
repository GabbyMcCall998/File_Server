const port = 5000;
const express= require('express')
const auth = require("./routes/auth")
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

//creating upload endpoint
app.use('/files',express.static('upload/files'))
app.post("/upload",upload.single('record'),(req,res)=>{
    res.json({
        success:1,
        file_url:`http://localhost:${port}/files/${req.file.filename}`
    })
})




app.get("/", (req,res) =>{
    res.send('hi am alive and kicking butts')

})


app.listen(port, ()=>{
    console.log('The app is running on port 5000')
})