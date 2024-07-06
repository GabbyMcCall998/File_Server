const request = require('supertest');
const express = require('express');
const path = require('path');
const multer = require('multer');
const adminFileController = require('../controllers/adminFileController');

const app = express();

const storage = multer.diskStorage({
    destination: './upload/files',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

app.use(express.json()); 
app.use('/api', require('../routes/adminRoutes')); 

describe('File Server API', () => {
    it('should upload a file', async () => {
        const res = await request(app)
            .post('/api/upload')
            .attach('file', 'path/to/test/file.txt'); // Adjust file path

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success', true);
    });

    it('should add a file to the database', async () => {
        const fileData = {
            title: 'Test File',
            category: 'Test',
            description: 'Testing file upload',
            file_download_url: 'http://localhost:3000/files/testfile.txt',
            file_path: '/upload/files/testfile.txt'
        };

        const res = await request(app)
            .post('/api/addfile')
            .send(fileData);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success', true);
    });

    it('should remove a file from the database', async () => {
        const fileId = 'replace_with_valid_file_id';

        const res = await request(app)
            .post('/api/fileremove')
            .send({ id: fileId });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('success', true);
    });

    it('should retrieve all files', async () => {
        const res = await request(app)
            .get('/api/allfiles');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });
});
