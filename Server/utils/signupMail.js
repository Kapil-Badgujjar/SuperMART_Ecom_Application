require('dotenv').config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EMAIL_API_KEY);

function signupMail(email,token){
    console.log(email);
    let mail = {
        to: email,
        from: {
            name: 'Kapil',
            email: 'kapilbatra0786@gmail.com'
        },
        subject: 'Verify your email',
        text: 'Verify your email',
        html: `<h2>Click on the link below to verify email...</h2><a href="http://localhost:5000/user/verifyEmail/${token}">Click here to verify</a>`
    }
    sgMail.send(mail).then((response) => console.log('Email sent ...'))
    .catch((error)=>console.log(error.message));
}
module.exports = signupMail;