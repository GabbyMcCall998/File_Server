const router = require("express").Router()
const {check, validationResult} = require("express-validator")
const {users} = require("../db")
const bcrypt = require("bcrypt");
const JWT = require ("jsonwebtoken")



//Signup Route
router.post("/signup", [
    check("email","Please provide a valid email").isEmail(),                                            //Checks email is in valid format
    check("password","Password lenght must greater than 5 characters").isLength({min:6})                // Check if password is at least 6 characters long
], async (req,res)=>{
    const { password, email } = req.body;

    console.log(password,email)

    // VALIDATED THE INPUT
    const errors = validationResult(req)    //looks inside req.body to ensure email and password to ensure they follow specified rules and returns errors
     if (!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
     }

    // VALIDATED IF USER WITH THAT EMAIL DOESN'T EXIST ALREADY EXIST
     let user = users.find((user)=>{
        return user.email == email
     });

     if (user){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "This user already exists",
                }
            ]
        })
     }

     const hashedPassword = await bcrypt.hash(password,10) 
     users.push({
        email,
        password:hashedPassword
     })

     const token = await JWT.sign({
        email
     }, "tehvlydgukjhyukjbh",{
        expiresIn: 900
    })
     res.json({
        token
     })
})  



//LOGIN ROUTE
router.post("/login",async (req,res)=>{
    const {password, email} = req.body;

    // Check if user exists
    let user = users.find((user)=>{
        return user.email === email
    });

    if (!user){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid Credentials",
                }
            ]
        })
    }

    //Compare passwords
    let isMatch = await bcrypt.compare(password , user.password)

    if (!isMatch){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "This user already exists",
                }
            ]
        })
   
    }


    //Sign JWT token if credentials are valid
const token = await JWT.sign({
    email
 }, "tehvlydgukjhyukjbh",{
    expiresIn: 900
})

 res.json({
    token
 })



})


router.get("/all",(req,res)=>{
    res.json(users)
})


module.exports=router

