const request = require('supertest');
const app = require('../index'); 

describe('Send File via Email', () => {
    it('should send a file via email', async () => {
        // Assuming you have a valid file ID and email address for testing
        const fileId = '12345'; // Replace with an actual file ID in your database
        const testEmail = 'testuser@example.com'; // Replace with a valid test email address

        const res = await request(app)
            .post('/send-file')
            .send({ id: fileId, email: testEmail });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('File sent via email successfully');
        // Optionally, check for additional assertions based on your response
    });

    it('should handle file not found', async () => {
        const invalidFileId = 'invalidId'; // Replace with an invalid file ID

        const res = await request(app)
            .post('/send-file')
            .send({ id: invalidFileId, email: 'testuser@example.com' });

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toContain('File not found');
    });

    // Add more test cases for handling different scenarios as needed
});
