const loadProducts = require('../services/getProducts');
let counter=0;
function setCounter(){
    counter=0;
};
async function getProducts(){
    let products = await loadProducts(false,counter,undefined);
    if(products.length>0){
        counter++;
        return products;
    }else{
        return [];
    }
};
async function getSingleProduct(productID){
    let products = await loadProducts(false,undefined,productID);
    if(products.length==1){
        return products[0];
    }
    else return undefined;
}
async function getAllProducts(){
    let products = await loadProducts(true,undefined,undefined);
    return products;
}
module.exports = { setCounter, getProducts, getSingleProduct, getAllProducts };