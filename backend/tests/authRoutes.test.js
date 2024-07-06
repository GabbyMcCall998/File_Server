const request = require('supertest');
const { expect } = require('chai');
const express = require('express');
const authRoutes = require('../routes/authRoutes'); 

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes); // Mount the router under /api/auth

describe('Auth Routes', () => {
  it('should sign up a user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).to.equal(201); // Assuming status 201 for successful signup
    expect(res.body).to.have.property('message', 'An email has been sent to your account. Please verify your email.');
    // Add more assertions as needed
  });

  it('should sign up an admin', async () => {
    const res = await request(app)
      .post('/api/auth/admin/signup')
      .send({
        email: 'admin@example.com',
        password: 'admin123'
      });

    expect(res.status).to.equal(201); // Assuming status 201 for successful admin signup
    expect(res.body).to.have.property('message', 'An email has been sent to your account. Please verify your email.');
  });

  it('should log in a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).to.equal(200); // Assuming status 200 for successful login
    expect(res.body).to.have.property('token');
    // Add more assertions as needed
  });

  it('should verify email', async () => {
    // Assuming you have a valid verification token and user ID for testing
    const userId = 'replace_with_valid_user_id';
    const verificationToken = 'replace_with_valid_verification_token';

    const res = await request(app)
      .get(`/api/auth/verify-email/${userId}/verify/${verificationToken}`);

    expect(res.status).to.equal(200); // Assuming status 200 for successful email verification
    expect(res.body).to.have.property('message', 'Email verification successful');
    // Add more assertions as needed
  });

  it('should send a password reset email', async () => {
    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({
        email: 'test@example.com'
      });

    expect(res.status).to.equal(200); // Assuming status 200 for successful password reset request
    expect(res.body).to.have.property('status', 'Password reset link has been sent to your email');
    // Add more assertions as needed
  });

  it('should reset user password', async () => {
    // Assuming you have a valid reset token and user ID for testing
    const userId = 'replace_with_valid_user_id';
    const resetToken = 'replace_with_valid_reset_token';

    const res = await request(app)
      .post(`/api/auth/reset-password/${userId}/${resetToken}`)
      .send({
        password: 'newpassword123'
      });

    expect(res.status).to.equal(200); // Assuming status 200 for successful password reset
    expect(res.body).to.have.property('status', 'Password updated');
    // Add more assertions as needed
  });

  it('should retrieve all users', async () => {
    const res = await request(app)
      .get('/api/auth/allUsers');

    expect(res.status).to.equal(200); // Assuming status 200 for successful retrieval of users
    expect(res.body).to.be.an('array');
    // Add more assertions as needed
  });
});
