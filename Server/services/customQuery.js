const sql = require('mssql');
const configuration = require('./DatabaseConfiguration');
async function customQuery(query){
  const pool = await sql.connect(configuration);
  const result = await pool.request().query(query);
  await pool.close();
  return result.recordset;
}
module.exports = customQuery;