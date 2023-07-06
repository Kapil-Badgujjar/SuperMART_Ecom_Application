const sql = require('mssql');
const configuration = require('./DatabaseConfiguration');
async function getProducts(all,x,productID){
  const pool = await sql.connect(configuration);
  let result = undefined;
  if(all){
    result = await pool.request().query(`SELECT * FROM productsTable`);
  }else if(x==undefined){
    result = await pool.request().query(`SELECT * FROM productsTable WHERE productID = '${productID}'`);
  }else{
    result = await pool.request().query(`SELECT * FROM productsTable ORDER BY productID OFFSET ${x*5} ROWS FETCH NEXT 5 ROWS ONLY`);
  }
  await pool.close();
  return result.recordset;
}
module.exports = getProducts;