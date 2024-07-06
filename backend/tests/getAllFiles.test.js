const request = require('supertest');
const app = require('../index'); 

describe('Get All Files', () => {
    it('should get all files', async () => {
        const res = await request(app)
            .get('/allfiles');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
