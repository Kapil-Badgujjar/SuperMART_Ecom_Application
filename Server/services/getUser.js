const sql = require('mssql');
const configuration = require('./DatabaseConfiguration');
async function getUser(email,password){
  const pool = await sql.connect(configuration);
  const result = await pool.request().query(`SELECT * FROM AuthenticationTable WHERE emailID = '${email}' AND password = '${password}'`);
  await pool.close();
  return result.recordset;
}
module.exports = getUser;