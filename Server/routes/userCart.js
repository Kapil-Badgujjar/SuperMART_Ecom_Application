const express = require('express');
const router = express.Router();

const {updateItems, updateQuantity, removeProduct, getUserCart} = require('../controllers/cartController');

// router.route('/openCart').get((req,res)=>{
//     if(req.session.isLoggedIn==undefined) res.redirect('/login');
//     else res.render('userCart',{status:0 ,msg: req.session.userName});
// });
router.post('/getUserCart', async (req,res)=>{
    if(req.session.userID){
        let cartItems = await getUserCart(req.session.userID);
    // if(req.body.userID){
    //     let cartItems = await getUserCart(req.body.userID);
        if(cartItems.flag)
        {   
            res.statusCode = 200;
            res.json(cartItems.cartData);
        }
        else {
            res.statusCode = 200;
            res.json([]);
        }
    }
    else{
        res.statusCode = 200;
        res.json([]);
    }
});
// router.get('/getUserCart', async (req,res)=>{
//     if(req.session.userID){
//         let cartItems = await getUserCart(req.session.userID);
//         if(cartItems.flag)
//         {   
//             res.statusCode = 200;
//             res.json(cartItems.cartData);
//         }
//         else {
//             res.statusCode = 404;
//             res.json([]);
//         }
//     }
//     else{
//         res.statusCode = 401;
//         res.json([]);
//     }
// });
router.route('/addtocart').post(async (req, res) => {
    if(req.session.isLoggedIn){
        console.log(req.body, "Hello!");
        let flag = await updateItems(req.session.userID,req.body.productID);
        // let flag = await updateItems(req.body.userID,req.body.productID);
        if(flag){
            res.statusCode = 200;
            res.end('');
        }
        else{
            res.statusCode = 404;
            res.end('');
        }
    }
    else{
        res.statusCode = 404;
        res.end('');
    }
});
router.post('/updatecart',async (req,res)=>{
    console.log(req.body);
    if(req.session.isLoggedIn){
    // if(req.body.userID){
        let localFlag = await updateQuantity(req.session.userID,req.body.productID,req.body.flag);
        // let localFlag = await updateQuantity(req.body.userID,req.body.productID,req.body.flag);
        if(localFlag){
            res.statusCode = 200;
            res.end('success');
        } else {
            res.statusCode = 404;
            res.end('success');
        }
    } else {
        res.statusCode = 404;
        res.end('success');
    }

});
router.post('/removeproduct',async (req, res) => {
    console.log(req.body);
    if(req.session.isLoggedIn){
    // if(req.body.userID){
        let localFlag = await removeProduct(req.session.userID,req.body.productID);
        // let localFlag = await removeProduct(req.body.userID,req.body.productID);
        if(localFlag){
            res.statusCode = 200;
            res.end('');
        } else {
            res.statusCode = 404;
            res.end('');
        }
    } else {
        res.statusCode = 404;
        res.end('');
    }
});

module.exports = router;