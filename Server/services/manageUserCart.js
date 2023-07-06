const sql = require("mssql");
const customQuery = require("./customQuery");
const configuration = require('./databaseConfiguration');
const crypto = require("crypto");

async function loadUserCart(userID, productID) {
  const pool = await sql.connect(configuration);
  try {
    const result = await pool
      .request()
      .query(
        `SELECT productsTable.*, usersCartsTable.itemQuantity FROM productsTable INNER JOIN usersCartsTable ON productsTable.productID = usersCartsTable.productID WHERE userCartID = ${userID}`
      );
    await pool.close();
    return result.recordset;
  } catch (err) {
    await pool.close();
    console.log(err.message);
    return [];
  }
}

async function addProductToUserCart(userID, productID) {
  let item = await customQuery(
    `SELECT itemQuantity FROM usersCartsTable WHERE userCartID = ${userID} AND productID = ${productID}`
  );
  const pool = await sql.connect(configuration);
  try {
    if (item.length == 1) {
      await pool
        .request()
        .query(
          ` UPDATE usersCartsTable SET itemQuantity = ${
            item[0].itemQuantity + 1
          } WHERE userCartID = ${userID} AND productID = ${productID}`
        );
    } else {
      await pool
        .request()
        .query(
          `INSERT INTO usersCartsTable(userCartID,productID,itemQuantity) VALUES('${userID}','${productID}',${1})`
        );
    }
    await pool.close();
    return true;
  } catch (err) {
    await pool.close();
    console.log(err.message);
    return false;
  }
}

async function updateQuantity(userID, productID, flag) {
  const pool = await sql.connect(configuration);
  try {
    let quantity = await pool
      .request()
      .query(
        `SELECT itemQuantity FROM usersCartsTable WHERE userCartID = ${userID} AND productID = ${productID}`
      );
      quantity = quantity.recordset;
      console.log(quantity);
    if ((quantity[0].itemQuantity == 1) & (flag == false)) {
      await pool
        .request()
        .query(
          `DELETE usersCartsTable WHERE userCartID = ${userID} AND productID = ${productID}`
        );
      await pool.close();
      return true;
    }
    if (flag) {
      await pool
        .request()
        .query(
          `UPDATE usersCartsTable SET itemQuantity = ${quantity[0].itemQuantity + 1} WHERE userCartID = ${userID} AND productID = ${productID}`
        );
    } else {
      await pool
        .request()
        .query(
          `UPDATE usersCartsTable SET itemQuantity = ${quantity[0].itemQuantity - 1} WHERE userCartID = ${userID} AND productID = ${productID}`
        );
    }
    await pool.close();
    return true;
  } catch (err) {
    await pool.close();
    console.log(err.message);
    return false;
  }
}

async function removeProduct(userID, productID) {
  const pool = await sql.connect(configuration);
  try {
    await pool
      .request()
      .query(
        `DELETE usersCartsTable WHERE userCartID = ${userID} AND productID = ${productID}`
      );
    await pool.close();
    return true;
  } catch (err) {
    await pool.close();
    console.log(err.message);
    return false;
  }
}

async function orderProcessing(userID, payment_id){
  const pool = await sql.connect(configuration);
  try{
    const result = await pool.request().query(`SELECT * FROM usersCartsTable WHERE userCartID = ${userID}`);
    const payment_id = crypto.randomBytes(10).toString("hex");
    result.recordset.map(async item =>{
      console.log(item);
      await pool.request().query(`INSERT INTO Orders(userID,productID,quantity,status,payment_id,payment_status) VALUES('${userID}', '${item.productID}', '${item.itemQuantity}','processing','${payment_id}',0)`);
    })
    await pool.request().query(`DELETE FROM usersCartsTable WHERE userCartID = ${userID}`);
    return true;
  }
  catch(err){
    console.log(err.message);
    return false;
  }
}

async function orderDone(payment_id){
  const pool = await sql.connect(configuration);
  try{
    await pool.request().query(`UPDATE Orders SET payment_id = NULL, payment_status = 1 WHERE payment_id = '${payment_id}'`);
  }
  catch(error){
    console.log(error);
    return false;
  }
}

async function reverseOrder(payment_id){
  const pool = await sql.connect(configuration);
  try{
    const data = await pool.request().query(`WITH selected_orders AS (
      SELECT userID, productID, quantity
      FROM Orders
      WHERE payment_id = '${payment_id}'
    )
    INSERT INTO usersCartsTable (userCartID, productID, itemQuantity)
    SELECT selected_orders.userID, selected_orders.productID, selected_orders.quantity
    FROM selected_orders`);
    await pool.request().query(`DELETE FROM Orders WHERE payment_id = '${payment_id}'`);
  }
  catch(error){
    console.log(error);
  }
}

module.exports = {
  loadUserCart,
  addProductToUserCart,
  updateQuantity,
  removeProduct,
  orderProcessing,
  reverseOrder,
  orderDone
};
