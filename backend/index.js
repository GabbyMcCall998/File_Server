const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const path = require('path');
const Token=require('./models/token')
const bodyParser=require('body-parser')

const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const adminRoutes = require('./routes/adminRoutes');



const app = express();
const port = 5000;


//Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static('upload/files'));



//Routes
app.use('/auth',authRoutes)
app.use('/api',fileRoutes)
app.use('/api/admin',adminRoutes)



// MongoDB Connection
mongoose.connect('mongodb+srv://gabrielandoh998:Godneverfails998@cluster0.qqwl67e.mongodb.net/File_Server')







app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
