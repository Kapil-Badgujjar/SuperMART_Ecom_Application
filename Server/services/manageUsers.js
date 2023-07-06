const customQuery = require('./customQuery');
const sql = require('mssql');
const configuration = require('./DatabaseConfiguration');

async function activateChangeRequest(token){
  const pool = await sql.connect(configuration);
  try{
    await pool.request().query(`UPDATE AuthenticationTable SET passwordResetRequest = 1 WHERE mailToken = ${token}`);
    setTimeout(()=>{customQuery(`UPDATE AuthenticationTable SET passwordResetRequest = 0 WHERE mailToken = ${token}`)},60000);
    await pool.close();
    return true;
  }
  catch(err){
    console.log(err.message);
    await pool.close();
    return false;
  }
}

async function changePassword(newPassword,token){
  const pool = await sql.connect(configuration);
  try{
    await pool.request().query(`UPDATE AuthenticationTable SET password = '${newPassword}' WHERE mailToken = ${token}`);
    await pool.close();
    return true;
  }
  catch(err){
    console.log(err.message);
    await pool.close();
    return false;
  }
}

async function updatePassword(userID,newPassword){
  const pool = await sql.connect(configuration);
  try{
    await pool.request().query(`UPDATE AuthenticationTable SET password = '${newPassword}' WHERE userID = ${userID}`);
    await pool.close();
    return true;
  }
  catch(err){
    console.log(err.message);
    await pool.close();
    return false;
  }
}
module.exports = { activateChangeRequest, changePassword, updatePassword };