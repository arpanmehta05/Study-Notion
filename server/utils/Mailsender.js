const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title , body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: title,
            html: body
        })
        console.log(info);
        return info;
        // let transporter = nodemailer.createTransport({
        //     host: process.env.EMAIL_HOST,
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS
        //     }
        // });
        // let info = await transporter.sendMail({
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: title,
        //     text: body
        // })
        // console.log(info);
        // return info;
    }
    catch(err){
        console.log(err.message);
    }
};

module.exports = mailSender;