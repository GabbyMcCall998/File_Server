const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const mongoose = require('mongoose');
const { promisify } = require('util');
const tmp = require('tmp');
const File = require('../models/File');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const sendEmail = require('../utils/sendEmail');
const port = 5000

const ObjectId= mongoose.Types.ObjectId


//file download endpoint
exports.downloadFile = async (req, res) => {
        const { id } = req.params; // Extracts ID from request parameters

    try {
        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: `Invalid file ID: ${id}` });
        }

        // Convert ID to ObjectId
        const fileId = new ObjectId(id);

        // Find the file in the database by fileId
        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }

        // Increment downloads count
        file.downloads += 1;
        await file.save();

        //file download logic to send file to client
        res.download(file.file_path, file.title, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                return res.status(500).json({ success: false, message: 'Failed to download file' });
            }
        });
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ success: false, message: 'Failed to download file' });
    }
}



//File searching block
exports.searchFiles = async (req, res) => {
    try {
        
        const query = req.query.query;
        if(!query){
            return res.status(400).json({message:'Query is reqiured'})
        }

        //Performing a case sensitive search on title and description
        const files =await File.find({
            $or:[
                {title:{$regex: query, $options:'i'}},
                {description:{$regex: query, $options:'i'}}
            ]
        })

        //if keyword not found
        if (files.length === 0) {
            return res.status(404).json({ message: 'Sorry, no results found' });
        }

        res.json(files)
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }    
}




// Route to send file(compressed or not) via email
exports.sendFile = async (req, res) => {
    
    try {
        const { email, id } = req.body;
        const fileId = new ObjectId(id);

        // Find the file in the database by fileId
        const file = await File.findOne({ _id: fileId }).exec();
        if (!file) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }

        // Check if environment variables are loaded correctly
        if (!process.env.USER || !process.env.PASS) {
            return res.status(500).json({ success: false, message: 'Email credentials not provided' });
        }

        // Check file size
        const fileSizeInBytes = fs.statSync(file.file_path).size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert bytes to MB

        let filePathToSend = file.file_path;

        // If file size is 25MB or larger, compress it
        if (fileSizeInMB >= 25) {
            // Create a temporary directory
            const tempDirObj = tmp.dirSync({ unsafeCleanup: true }); // unsafeCleanup: automatically remove files on process exit

            // Get the path of the temporary directory
            const tempDirPath = tempDirObj.name;

            // Compressed file path
            const compressedFilePath = path.join(tempDirPath, `${file.title}.zip`);

            // Compress the file before sending via email
            await compressFile(file.file_path, compressedFilePath);

            filePathToSend = compressedFilePath;
        }

        
        // Send email with file attachment
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: 'File from File Server',
            text: `Hello,\n\nPlease find the file attached: ${file.title}`,
            attachments: [
                {
                    filename: path.basename(filePathToSend),
                    path: filePathToSend
                }
            ]
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ success: false, message: 'Failed to send file via email' });
            }

            // Cleanup: delete the temporary compressed file if created
            if (fileSizeInMB >= 25) {
                fs.unlinkSync(filePathToSend);
            }

            // Increment email sent count for the file
            file.email_sent_count += 1;
            await file.save();

            res.json({ success: true, message: 'File sent via email successfully' });
        });
    } catch (error) {
        console.error('Error sending file via email:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


// Helper function to compress file
const compressFile = async (inputFilePath, outputFilePath) => {
    const pipeline = promisify(require('stream').pipeline);

    try {
        const fileStream = fs.createReadStream(inputFilePath);
        const gzipStream = zlib.createGzip();
        const writeStream = fs.createWriteStream(outputFilePath);

        await pipeline(fileStream, gzipStream, writeStream);
        console.log('File compressed successfully:', outputFilePath);
    } catch (error) {
        console.error('Error compressing file:', error);
        throw error;
    }
};




