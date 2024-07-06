const request = require('supertest');
const app = require('../index'); 
const User = require('../models/User'); 

describe('User Signup', () => {
    it('should register a new user', async () => {
        const newUser = {
            email: 'testuser@example.com',
            password: 'password123',
            role: 'user' // Assuming user role is user
        };

        const res = await request(app)
            .post('/signup')
            .send(newUser);

        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toContain('An email has been sent to your account');
        const addedUser = await User.findOne({ email: 'testuser@example.com' });
        expect(addedUser).toBeTruthy();
    });
});
