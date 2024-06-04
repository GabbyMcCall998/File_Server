const express= require('express')
const auth = require("./routes/auth")
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


app.use("/auth", auth);0



app.get("/", (req,res) =>{
    res.send('hi am alive and kicking butts')

})


app.listen(5000, ()=>{
    console.log('The app is running on port 5000')
})