const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    const mailOptions = {
        from: process.env.USER,
        to: to,
        subject: subject,
        text: text
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
