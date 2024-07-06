const request = require('supertest');
const app = require('../index'); 
const File = require('../models/File'); 

describe('Remove File', () => {
    it('should remove a file and delete from file system', async () => {
        const newFile = new File({
            id: 1, 
            title: 'Test File',
            category: 'Test Category',
            file_download_url: 'http://localhost:5000/files/testfile.mp4',
            description: 'Test Description',
            file_path: './upload/files/testfile.mp4'
        });
        await newFile.save();

        const res = await request(app)
            .delete('/removefile')
            .send({ id: 1 }); 

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);

        const deletedFile = await File.findOne({ id: 1 });
        expect(deletedFile).toBeFalsy();
    });
});
