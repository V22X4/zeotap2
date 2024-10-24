const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
});

const sendEmail = (to, subject, text) => {
    console.log("Sending email to:", to);
    const mailOptions = {
        from: "wsocream@gmail.com",
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
