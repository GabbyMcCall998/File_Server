const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

//User Signup Route
router.post('/signup', [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password length must be greater than 5 characters').isLength({ min: 6 })
], authController.signup);

//admin Signup Route
router.post('/admin/signup', [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password length must be greater than 5 characters').isLength({ min: 6 })
], authController.AdminSignup);



//login route
router.post('/login', authController.login);



//Verify email route
router.get('/verify-email/:id/verify/:Vtoken', authController.verifyEmail);

router.post('/forgot-password', authController.forgotPassword);

router.get('/reset-password/:id/:token', authController.resetPassword);

router.post('/reset-password/:id/:token', authController.updateResetPassword);

router.get('/allUsers', authController.allUsers);



module.exports = router;
