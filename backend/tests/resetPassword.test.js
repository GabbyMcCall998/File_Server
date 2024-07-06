const request = require('supertest');
const app = require('../index'); 

describe('Reset Password', () => {
    it('should render password reset form', async () => {
        const userId = '12345'; // Replace with an actual user ID
        const token = 'validResetToken'; // Replace with a valid token

        const res = await request(app)
            .get(`/reset-password/${userId}/${token}`);

        expect(res.statusCode).toEqual(200);
    });
});
