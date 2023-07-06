require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const {getUserCart, orderSuccess} = require('../controllers/cartController')
const manageCart = require('../services/manageUserCart')
router.post('/create-payment-session',async (req,res)=>{
  const payment_id = crypto.randomBytes(10).toString('hex');
  console.log(payment_id);
  const storedItems = await getUserCart(req.body.userID);
  const status = await orderSuccess(req.body.userID,payment_id);
  // console.log(storedItems);

  try{
    const paymentSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: storedItems.cartData.map((item)=>{
        return {
          price_data : {
            currency: 'INR',
            product_data: {
              name: item.displayName,
            },
            unit_amount: item.price*100,
          },
          quantity: item.itemQuantity
        }
      }),
      success_url: process.env.SERVER_URL+`/payments/success/${payment_id}`,
      cancel_url: process.env.SERVER_URL + `/payments/cancel/${payment_id}`
    })
    res.json({url: paymentSession.url});
  }
  catch (err){
    console.log(err);
    res.status(401).send("Failed");
  }
})

router.post('/order-successful',async (req,res)=>{
  console.log(req.body.userID, " Orders successful ");
  const status = await orderSuccess(req.body.userID);
  if(status) res.status(200).send('done');
  else res.status(404).send('failed');
});

router.get('/success/:payment_id',(req,res)=>{
    const payment_id = req.params.payment_id;
    manageCart.orderDone(payment_id);
    res.redirect(process.env.CLIENT_URL+'/success')
});

router.get('/cancel/:payment_id',(req,res)=>{
    const payment_id = req.params.payment_id;
    manageCart.reverseOrder(payment_id);
    res.redirect(process.env.CLIENT_URL+'/cancel')
});

module.exports = router;