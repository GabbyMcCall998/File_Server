const request = require('supertest');
const app = require('../index'); 

describe('Forgot Password', () => {
    it('should send reset password link', async () => {
        const userEmail = 'testuser@example.com'; // Replace with an existing user's email

        const res = await request(app)
            .post('/forgot-password')
            .send({ email: userEmail });

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toContain('Password reset link has been sent');
    });
});
