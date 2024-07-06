const request = require('supertest');
const { expect } = require('chai');
const express = require('express');
const fileRoutes = require('../routes/fileRoutes'); // Adjust the path as needed
const fileController = require('../controllers/fileController');

const app = express();
app.use(express.json());
app.use('/api/files', fileRoutes); // Mount the router under /api/files

describe('File Routes', () => {
    it('should download a file', async () => {
        const fileId = 'replace_with_valid_file_id'; // Replace with a valid file ID

        const res = await request(app)
            .get(`/api/files/download/${fileId}`);

        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.include('application/octet-stream');
        // Add more assertions as needed
    });

    it('should search for files', async () => {
        const query = 'test'; // Replace with a valid search query

        const res = await request(app)
            .get(`/api/files/search?query=${query}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        // Add more assertions as needed
    });

    it('should send a file via email', async () => {
        const email = 'recipient@example.com'; // Replace with a valid email
        const fileId = 'replace_with_valid_file_id'; // Replace with a valid file ID

        const res = await request(app)
            .post('/api/files/sendfile')
            .send({
                email,
                id: fileId
            });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success', true);
        // Add more assertions as needed
    });
});
