const request = require('supertest');
const app = require('../index'); 
const File = require('../models/File'); 
describe('Add File to DB', () => {
    it('should add a file to the database', async () => {
        const newFile = {
            title: 'Test File',
            category: 'Test Category',
            file_download_url: 'http://localhost:5000/files/testfile.mp4',
            description: 'Test Description',
            file_path: './upload/files/testfile.mp4'
        };

        const res = await request(app)
            .post('/addfile')
            .send(newFile);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);

        const addedFile = await File.findOne({ title: 'Test File' });
        expect(addedFile).toBeTruthy();
    });
});
