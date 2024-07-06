const request = require('supertest');
const app = require('../index'); 
describe('Update Reset Password', () => {
    it('should update user password after reset', async () => {
        const userId = '12345'; // Replace with an actual user ID
        const token = 'validResetToken'; // Replace with a valid token
        const newPassword = 'newPassword123'; // Replace with a new password

        const res = await request(app)
            .put(`/update-reset-password/${userId}/${token}`)
            .send({ password: newPassword });

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('Password updated');
    });
});
