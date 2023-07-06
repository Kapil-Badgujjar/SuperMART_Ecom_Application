const manageCart = require('../services/manageUserCart');

async function updateItems(userID,productID) {
    return await manageCart.addProductToUserCart(userID, productID);
}

async function updateQuantity(userID,productID,flag){
    return await manageCart.updateQuantity(userID,productID,flag);
}

async function removeProduct(userID, productID){
    return await manageCart.removeProduct(userID, productID);
}
async function getUserCart(userID) {
    let cartItems = await manageCart.loadUserCart(userID);
    if(cartItems.length > 0)
    return { flag: true, cartData: cartItems};
    return {flag:false, cartData:undefined};
}

async function orderSuccess(userID, payment_id){
    return await manageCart.orderProcessing(userID, payment_id);
}
module.exports = {updateItems, updateQuantity, removeProduct, getUserCart, orderSuccess};