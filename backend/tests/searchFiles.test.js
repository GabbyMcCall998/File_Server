const request = require('supertest');
const app = require('../index'); 
const File = require('../models/File'); 

describe('File Search', () => {
    it('should search for files by query', async () => {
        const searchQuery = 'example'; // Replace with a search query that matches some files in your database

        const res = await request(app)
            .get(`/search-files?query=${searchQuery}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        // Optionally, check for specific file properties or structure
    });

    it('should handle missing query parameter', async () => {
        const res = await request(app)
            .get('/search-files');

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toContain('Query is required');
    });

    it('should handle no results found', async () => {
        const nonExistentQuery = 'nonExistentQuery'; // Replace with a query that does not match any files

        const res = await request(app)
            .get(`/search-files?query=${nonExistentQuery}`);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toContain('no results found');
    });
});
