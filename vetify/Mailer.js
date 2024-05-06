const nodemailer = require('nodemailer');
// fmtj oqmy kras fdkx
// fmtj oqmy kras fdkx


// khai báo transporter
// khai báo thông tin email
const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'thetreesapp@gmail.com',
        pass: 'gsabegzrpmnyomwv'
    },
});
const sendMail = async (data) => {
    try {
        const { email, subject, content } = data;
        const mailOptions = {
            from: 'thetreesapp@gmail.com',
            to: email,
            subject,
            html: content,
        };
        await transporter.sendMail(mailOptions);
        return true;
    }
    catch (error) {
        console.log(error);
        throw new Error('Có lỗi xảy ra khi gửi email');
    }
}

module.exports = {
    sendMail,
}