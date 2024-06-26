require('dotenv').config();
const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email not sent due to error: ", error.responseCode);
        console.error(error.message);
    }
};
