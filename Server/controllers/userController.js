const getUsers = require('../services/getUser');
const customQuery = require('../services/customQuery');
const { activateChangeRequest, changePassword } = require('../services/manageUsers')
async function verifyUser(session,email,password){
    try{
        users = await getUsers(email,password);
        if(users.length==1){
            if(users[0].isVerified)
            { 
                session.userID=users[0].userID;
                session.userName=users[0].userName; 
                return 1;
            }else{ 
                return 0;
            }
        }
    }catch(e){
        console.log(e.message);
    }
    return -1;
}
async function addUser(obj){
    let fileData = await customQuery(`SELECT * FROM AuthenticationTable where emailID = '${obj.email}'`);
    if(fileData.length==1) return false;
    try{
        await customQuery(`INSERT INTO AuthenticationTable(userName,emailID,password,isVerified,passwordResetRequest,mailToken,role) values('${obj.username}','${obj.email}','${obj.password}',0,0,'${obj.mailToken}','User')`);
        return true;
    }catch(err){
        console.log(err.message);
    }
    return false;
}

async function forgotPassword(email){
    let user = await customQuery(`SELECT * FROM AuthenticationTable WHERE emailID = '${email}'`);
    if(user.length==1){
        return { choice: true, token: user[0].mailToken };
    }
    return { choice: false, token: undefined };
}

let resetToken=undefined;
async function activatePasswordReset(token){
    resetToken = token;
    setTimeout(() =>{
        resetToken=undefined;
    },60000);
    return await activateChangeRequest(token);
};
async function resetAccountPassword(obj){
    let flag =  await changePassword(obj.password,resetToken);
    resetToken = undefined;
    return flag;

}

module.exports = {
    verifyUser,
    addUser,
    forgotPassword,
    activatePasswordReset,
    resetAccountPassword
};