const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const Token = require('../models/token'); 



const sendEmail = require('../utils/sendEmail');

const JWT_SECRET = process.env.JWT_SECRET;


// User Signup Endpoint
exports.signup = async (req, res) => {
  const { email, password, role } = req.body;
  const normalizedEmail = email.toLowerCase();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'This email is already registered' }] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      email: normalizedEmail,
      password: hashedPassword,
      role:'user',
    });

    await user.save();

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newToken = new Token({
      userId: user._id,
      Vtoken: verificationToken
    });
    await newToken.save();

    const verificationUrl = `${process.env.BASE_URL.replace(/\/+$/, '')}/verify-email/${user._id}/verify/${verificationToken}`;
    await sendEmail(user.email, "Verify Email", verificationUrl);

    res.status(201).json({ message: "An email has been sent to your account. Please verify your email." });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

//Admin signup Endpoint
exports.AdminSignup = async (req, res) => {
  const { email, password, role } = req.body;
  const normalizedEmail = email.toLowerCase();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'This email is already registered' }] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      email: normalizedEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await user.save();

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newToken = new Token({
      userId: user._id,
      Vtoken: verificationToken
    });
    await newToken.save();

    const verificationUrl = `${process.env.BASE_URL.replace(/\/+$/, '')}/verify-email/${user._id}/verify/${verificationToken}`;
    await sendEmail(user.email, "Verify Email", verificationUrl);

    res.status(201).json({ message: "An email has been sent to your account. Please verify your email." });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}


//Login Endpoint
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const response = { token, role: user.role };

    if (user.role === 'admin') {
      response.adminToken = token;
    }

    res.send(response);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).send({ error: 'An error occurred while processing your request' });
  }
};


exports.verifyEmail=async (req, res) => {
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
      const tokenExpiration = token.createdAt.getTime() + (24 * 60 * 60 * 1000); // Assumed 24 hours expiry
      if (Date.now() > tokenExpiration) {
          console.log('Token expired for user:', user._id, 'and token:', Vtoken);
          await Token.findByIdAndDelete(token._id); 
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
};




//Forgot password Endpoint
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ status: "User does not exist" });
      }

      // Generate JWT token for password reset link
      const secret = JWT_SECRET + user.password;
      const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '5m' });
      
      // link to  reset password
      const resetLink = `http://localhost:3000/reset-password/${user._id}/${token}`;

      // Send email with the reset password link
      await sendEmail(email, 'Password Reset', `Please click the link to reset your password: ${resetLink}`);
      
      res.json({ status: 'Password reset link has been sent to your email' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error generating reset link" });
  }
};



// Reset Password Endpoint
exports.resetPassword=async (req, res) => {
  const { id, token } = req.params;
  try {
      const oldUser = await User.findById(id);
      if (!oldUser) {
          return res.status(404).json({ status: "User does not exist" });
      }

      const secret = JWT_SECRET + oldUser.password;
      try {
          const verify = jwt.verify(token, secret);
          res.render("ForgotPassword", { email: verify.email, status: "Not Verified" }); 
      } catch (error) {
          console.error(error);
          res.status(400).send("Invalid or expired token");
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Server error" });
  }
};



// Update Password Endpoint
exports.updateResetPassword=async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
      const oldUser = await User.findById(id);
      if (!oldUser) {
          return res.status(404).json({ status: "User does not exist" });
      }

      const secret = JWT_SECRET + oldUser.password;
      try {
          jwt.verify(token, secret);
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

}


// Endpoint to get all users
exports.allUsers=async (req, res) => {
  const myUsers = await User.find({});
  console.log("All Users Fetched")
  res.json(myUsers);
};



