require('dotenv').config();
const express = require('express');
const {verifyUser, addUser, activatePasswordReset, resetAccountPassword, forgotPassword } = require('../controllers/userController');
const verifyEmail = require('../controllers/verifyEmail');
const { updatePassword } = require('../services/manageUsers')
const sendMail = require('../utils/signupMail');
const passwordResetEmail = require('../utils/passwordResetEmail');
const router = express.Router();

router.get('/checkSessionExists',(req,res)=>{
    console.log('Check session #');
    console.log(req.session.userName);
    if(req.session.userName === undefined){
        return res.status(404).send("No");
    }
    if(req.session.isLoggedIn){
        return res.status(200).json({flag: true, code: 1, username: req.session.userName, userID: req.session.userID, message: 'Success'});
    }
    return res.status(200).json({flag: true, code: 0, username: 'Admin', userID: undefined, message: 'Success'});;
})

router.route('/login').post(async (req,res)=>{
    console.log(req.body,"<--Login form values");
    let email = req.body.email;
    let password = req.body.password;
    if(email == process.env.ADMIN_ID && password == process.env.ADMIN_PASSWORD){
        req.session.isLoggedIn=false;
        req.session.adminLogin=true;
        req.session.userName = 'Admin';
        res.statusCode = 200;
        res.json({flag: true, code: 0, username: 'Admin', userID: undefined, message: 'Success'});
        res.end('');
    }else{
        let route = await verifyUser(req.session,email, password);
        if(route==1){
            req.session.adminLogin=false;
            req.session.isLoggedIn=true;
            res.statusCode = 200;
            res.json({flag: true, code: 1, username: req.session.userName, userID: req.session.userID, message: 'Success'});
        }else if(route==0){
            res.statusCode = 200;
            res.json({flag: false, code: 2, username: undefined, userID: undefined, message:'Failed! Verify your account'});
        }else{
            res.statusCode = 200;
            res.json({flag: false, code: 3, username: undefined, userID: undefined, message:'User not found'});
        }
    }
});

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.status(200).send('Logout successful');
});

router.post( '/signup',async (req,res)=>{
    let obj = req.body;
    console.log(obj);
    obj.mailToken = Date.now();
    if(await addUser(obj)){
        sendMail(obj.email,obj.mailToken);
        res.json('Email sent successfully');
    }else{
        res.statusCode = 305;
        res.json('Error');
    }
});

router.route('/updatePassword').post(async (req,res)=>{
    let flag = await updatePassword(req.session.userID,req.body.newPassword);
    if(flag){
        res.statusCode = 200;
        res.end('');
    }else{
        res.statusCode = 403;
        res.end('');
    }
});

router.get('/activatePasswordReset/:token',async (req,res)=>{
    const { token } = req.params;
    if(await activatePasswordReset(token)){
        res.statusCode = 200;
        res.end('');
    }else{
        res.end('');
    }
});

router.route('/forgotPassword')
.post(async (req,res)=>{
    console.log('Forgot Password --<<--');
    let status = await forgotPassword(req.body.email);
    if(status.choice){
        passwordResetEmail(req.body.email,status.token);
        res.statusCode=200;
        res.end('');
    }else{
        res.statusCode=404;
        res.end('');
    }
});

router.route('/resetPassword').post(async (req,res)=>{
    if(await resetAccountPassword(req.body)){
        res.statusCode = 200;
        res.end('');
    }
    else{
        res.statusCode = 404;
        res.end('');
    }
});

router.get('/verifyEmail/:token', async (req,res)=>{
    const { token } = req.params;
    if(await verifyEmail(token)){
        res.send('Email verified');
    }else{
        res.send('Some Error occurred');
    }
});

module.exports = router;