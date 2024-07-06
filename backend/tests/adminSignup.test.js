const request = require('supertest');
const app = require('../index'); 
const User = require('../models/User'); 

describe('Admin Signup', () => {
    it('should register a new admin', async () => {
        const newAdmin = {
            email: 'testadmin@example.com',
            password: 'adminpassword',
            role: 'admin'
        };

        const res = await request(app)
            .post('/adminsignup')
            .send(newAdmin);

        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toContain('An email has been sent to your account');
        const addedAdmin = await User.findOne({ email: 'testadmin@example.com' });
        expect(addedAdmin).toBeTruthy();
    });
});
