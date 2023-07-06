const sql = require('mssql');
const configuration = require('./DatabaseConfiguration');
async function addProduct(product, imageSource){
  const pool = await sql.connect(configuration);
  try{
    await pool.request().query(`INSERT INTO productsTable(name,displayName,imageSource,price, color, description, sellerID, availableStocks) VALUES('${product.name}','${product.displayName}','${imageSource}',${product.price},'${product.color}','${product.description}',1,${product.availableStocks})`);
    await pool.close();
    return true;
  }catch(err){
    console.log(err.message);
    await pool.close();
    return false;
  }
}

async function updateProduct(product, imageSource){
  const pool = await sql.connect(configuration);
  try{
    if(imageSource){
        let query= `UPDATE productsTable SET name = '${product.name}',displayName = '${product.displayName}',imageSource = '${imageSource}',price = ${parseInt(product.price)}, color = '${product.color}', description = '${product.description}', sellerID = 1, availableStocks = ${parseInt(product.availableStocks)} WHERE productID = ${parseInt(product.productID)}`
        await pool.request().query(query);
    } else {
        let query = `UPDATE productsTable SET name = '${product.name}',displayName = '${product.displayName}',price = ${parseInt(product.price)}, color = '${product.color}', description = '${product.description}', sellerID = 1, availableStocks = ${parseInt(product.availableStocks)} WHERE productID = ${parseInt(product.productID)}`
        await pool.request().query(query);
    }
    await pool.close();
    return true;
  }catch(err){
    console.log(err.message);
    await pool.close();
    return false;
  }
}

async function deleteProduct(productID){
  const pool = await sql.connect(configuration);
  const transaction =new sql.Transaction(pool);
  try{
    transaction.begin();
    await pool.request().query(`DELETE productsTable WHERE productID = ${productID}`);
    await pool.request().query(`DELETE usersCartsTable WHERE productID = ${productID}`);
    transaction.commit();
    await pool.close();
    return true;
  }catch(err){
    console.log(err.message);
    transaction.rollback();
    await pool.close();
    return false;
  }
}

module.exports = { addProduct, updateProduct, deleteProduct };