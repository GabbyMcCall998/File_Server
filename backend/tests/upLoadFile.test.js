const request = require('supertest');
const app = require('../index'); 
const path = require('path');

describe('File Upload', () => {
    it('should upload a file', async () => {
        const filePath = path.resolve(__dirname, './testfiles/sample.txt'); // Adjust with an actual file path for testing

        const res = await request(app)
            .post('/uploadfile')
            .attach('file', filePath)
            .field('title', 'Test File')
            .field('category', 'Test Category')
            .field('description', 'Test Description');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.file_download_url).toBeDefined();
        expect(res.body.file_path).toBeDefined();
    });
});
