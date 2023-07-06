const customQuery = require('../services/customQuery');
async function verifyEmail(token){
    let user = await customQuery(`SELECT * FROM AuthenticationTable WHERE mailToken = '${token}'`);
    if(user.length == 1){
        try{
            await customQuery(`UPDATE AuthenticationTable SET isVerified = 1 WHERE mailToken = '${token}'`);
            return true;
        }
        catch(err){
            console.log(err.message);
            return false;
        }
    }
    return false;
}
module.exports = verifyEmail;