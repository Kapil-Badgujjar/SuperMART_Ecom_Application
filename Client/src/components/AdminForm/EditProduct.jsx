import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from './AdminProductEditForm';
import Context from '../../utils/context';
import './AdminProductEditForm.scss';
export default function EditProduct() {
  const navigate = useNavigate();
  const {id} = useParams('id');
  const { productDetails, setProductDetails,                 
    name, setName,
    displayName, setDisplayName,
    price, setPrice,
    color, setColor,
    description, setDescription,
    quantity, setQuantity,
    image, setImage, loginCode} = useContext(Context);

  useEffect(() => {
    if(loginCode!=0){
      navigate('/login');
    }
    async function fun(){
      const {status, data} = await axios.post('http://localhost:5000/products/singleproduct',{productID: id},{withCredentials: true});
      if(status==200)  
        {
          console.log(data);
          setProductDetails(data);
          setName(data.name)
          setDisplayName(data.displayName);
          setPrice(data.price);
          setColor(data.color);
          setDescription(data.description);
          setQuantity(data.availableStocks);
          setImage(data.imageSource);
        }
    }
    fun();
  },[]);
  return (
    <div className="formSection">
      <ProductForm btnName={"Update"} flag={true} />
    </div>
  )
}
