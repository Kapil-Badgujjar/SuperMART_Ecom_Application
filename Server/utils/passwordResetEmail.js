require('dotenv').config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EMAIL_API_KEY);
function passwordResetEmail(email,token){
    
    let mail = {
        to: email,
        from: {
            name: 'Kapil',
            email: 'kapilbatra0786@gmail.com'
        },
        subject: 'Password reset request',
        text: 'Click on the link below to reset your password',
        html: `<h2>Click on the link below to reset your password</h2><a href="http://localhost:5173/updatepassword/${token}">Click here</a>
        <p>This link is valid for only 2 minutes.</p>`
    }
    sgMail.send(mail).then((response) => console.log('Email sent ...'))
    .catch((error)=>console.log(error.message));
}

module.exports = passwordResetEmail;