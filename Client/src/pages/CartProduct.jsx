import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect, useContext} from 'react'
import Style from './UserCart.module.css';
import axios from 'axios';
import Context from '../utils/context';
export default function Product({product, update, setUpdate}) {
    const [quantity, setQuantity] = useState(product.itemQuantity);
    const {userID,loginCode} = useContext(Context);
    const navigate = useNavigate();
    
    useEffect(()=>{
      product.itemQantity = quantity;  
    },[quantity]);



    async function updateQuantity(productId, flag){
      const {status, data} = await axios.post('http://localhost:5000/cart/updatecart',{productID: productId, userID: userID, flag: flag},{withCredentials: true});
        if(status == 200){
          setQuantity(flag ? quantity+1 : quantity-1);
          update ? setUpdate(false) : setUpdate(true);
      }
    }
    async function removeProduct(productId){
      const {status, data} = await axios.post('http://localhost:5000/cart/removeproduct',{productID: productId, userID: userID},{withCredentials: true});
        if(status == 200){
            update ? setUpdate(false) : setUpdate(true);
      }
    };
  return (
    <div className="list" >
        <img src={"http://localhost:5000/" + product.imageSource} />
        <div className="details">
            <p>{product.displayName}</p>
            <p>Price: &#8377; {product.price}</p>
        </div>
        <div className="quantity">
          <div className="controller">
            <button onClick={()=>{updateQuantity(product.productID,false)}}>-</button>
            <span>{quantity}</span>
            <button onClick={()=>{updateQuantity(product.productID,true)}} >+</button>
          </div>
            <button onClick={()=>{removeProduct(product.productID)}}>Remove</button>
        </div>
    </div>
  )
}
