const fs = require('fs');
const zlib = require('zlib');
const { promisify } = require('util');

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

module.exports = {
    compressFile
};
