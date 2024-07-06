const request = require('supertest');
const app = require('../index'); 

describe('User Login', () => {
    it('should login with correct credentials', async () => {
        const credentials = {
            email: 'testuser@example.com', // Use existing user's email
            password: 'password123' // Use the corresponding password
        };

        const res = await request(app)
            .post('/login')
            .send(credentials);

        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.role).toEqual('user');
    });
});
