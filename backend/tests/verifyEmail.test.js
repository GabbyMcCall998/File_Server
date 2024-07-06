const request = require('supertest');
const app = require('../index'); 

describe('Verify Email', () => {
    it('should verify user email', async () => {
        const userId = '12345'; // Replace with an actual user ID
        const token = 'validVerificationToken'; // Replace with a valid token

        const res = await request(app)
            .get(`/verify-email/${userId}/verify/${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Email verification successful');
    });
});
