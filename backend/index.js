const port = 5000;
const express = require('express');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const Token=require('./models/token')
const sendEmail=require('../backend/sendEmail')
const crypto = require('crypto')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());


const File = require('./models/File'); 
const User = require('./models/User')

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1);
  }



// Connect to MongoDB
mongoose.connect('mongodb+srv://gabrielandoh998:Godneverfails998@cluster0.qqwl67e.mongodb.net/File_Server')


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





app.post('/signup', [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password length must be greater than 5 characters').isLength({ min: 6 })
], async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user with the same email exists
        let user = await User.findOne({ email: normalizedEmail });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'This email is already registered' }] });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance
        user = new User({
            email: normalizedEmail,
            password: hashedPassword
        });

        // Save user to the database
        await user.save();

        // Generate and save verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const newToken = new Token({
            userId: user._id,
            Vtoken: verificationToken
        });
        await newToken.save();

        // Construct verification URL and send email
        const verificationUrl = `${process.env.BASE_URL.replace(/\/+$/, '')}/verify-email/${user._id}/verify/${verificationToken}`;
        await sendEmail(user.email, "Verify Email", verificationUrl);

        // Respond with success message
        res.status(201).json({ message: "An email has been sent to your account. Please verify your email." });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if user is verified
      if (!user.is_verified) {
        return res.status(403).json({ message: 'Email not verified. Please verify your email before logging in.' });
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const payload = { user: { id: user.id } };
      JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Server error' });
    }
});




// Endpoint to get all users
app.get('/allUsers',async (req, res) => {
    const myUsers = await User.find({});
    console.log("All Users Fetched")
    res.json(myUsers);
});
  




app.get('/verify-email/:id/verify/:Vtoken', async (req, res) => {
    const { id, Vtoken } = req.params;
    
    try {
        // Find the user by id
        const user = await User.findById(id);
        if (!user) {
            console.log('User not found for id:', id);
            return res.status(400).json({ message: 'Invalid token or user not found.' });
        }

        // Find the token in the Token collection
        const token = await Token.findOne({ userId: user._id, Vtoken });
        if (!token) {
            console.log('Token not found for user:', user._id, 'and token:', Vtoken);
            return res.status(400).json({ message: 'Invalid token or user not found.' });
        }

        // Check if the token is expired
        const tokenExpiration = token.createdAt.getTime() + (24 * 60 * 60 * 1000); // Assuming 24 hours expiry
        if (Date.now() > tokenExpiration) {
            console.log('Token expired for user:', user._id, 'and token:', Vtoken);
            await Token.findByIdAndDelete(token._id); // Optionally delete expired token
            return res.status(400).json({ message: 'Token expired. Please request a new verification email.' });
        }

        // Update user's verification status and save
        user.is_verified = true;
        await user.save();

        // Delete the token from Token collection
        await Token.findByIdAndDelete(token._id);

        // Respond with success message
        console.log('User verified and token removed');
        return res.status(200).json({ message: 'Email verification successful' });
    } catch (error) {
        console.error('Verification failed:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



 
//Forgot password Endpoint
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.status(404).json({ status: "User does not exist" });
        }

        const secret = JWT_SECRET + oldUser.password;
        const token = JWT.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '5m' });
        const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`; // Adjust the URL as needed
        console.log(link);

        // Send email with the link
        await sendEmail(email, 'Password Reset', `Please click the link to reset your password: ${link}`)
        res.json({status:'Password reset link has been sent to your email'})
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error generating reset link" });
    }
});


// Reset Password Endpoint
app.get('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    try {
        const oldUser = await User.findById(id);
        if (!oldUser) {
            return res.status(404).json({ status: "User does not exist" });
        }

        const secret = JWT_SECRET + oldUser.password;
        try {
            const verify = JWT.verify(token, secret);
            res.render("ForgotPassword", { email: verify.email, status: "Not Verified" }); // Adjust your rendering logic as needed
        } catch (error) {
            console.error(error);
            res.status(400).send("Invalid or expired token");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server error" });
    }
});


// Update Password Endpoint
app.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const oldUser = await User.findById(id);
        if (!oldUser) {
            return res.status(404).json({ status: "User does not exist" });
        }

        const secret = JWT_SECRET + oldUser.password;
        try {
            JWT.verify(token, secret);
            const encryptedPassword = await bcrypt.hash(password, 10);
            oldUser.password = encryptedPassword;
            await oldUser.save();

            res.json({ status: "Password updated" });
        } catch (error) {
            console.error(error);
            res.status(400).json({ status: "Invalid or expired token" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server error" })

    }

})




app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
