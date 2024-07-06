const request = require('supertest');
const app = require('../index'); 
const File = require('../models/File'); 

describe('File Download', () => {
    it('should download a file', async () => {
        // Assuming you have a valid file ID
        const fileId = '12345'; // Replace with an actual file ID in your database

        const res = await request(app)
            .get(`/download-file/${fileId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-disposition']).toBeDefined();
        // Optionally, check for specific headers or content
    });

    it('should handle invalid file ID', async () => {
        const invalidFileId = 'invalidId'; // Replace with an invalid file ID

        const res = await request(app)
            .get(`/download-file/${invalidFileId}`);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toContain('Invalid file ID');
    });

    it('should handle file not found', async () => {
        const nonExistentFileId = 'nonExistentId'; // Replace with a non-existent file ID

        const res = await request(app)
            .get(`/download-file/${nonExistentFileId}`);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toContain('File not found');
    });
});
