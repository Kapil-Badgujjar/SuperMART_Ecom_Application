import React, { useContext, useEffect } from 'react'
import ProductForm from './AdminProductEditForm';
import './AdminProductEditForm.scss';
import Context from '../../utils/context';
import { useNavigate } from 'react-router-dom';
export default function AddProduct() {
  const navigate = useNavigate();
    const {productDetails, setProductDetails,
        name, setName,
        displayName, setDisplayName,
        price, setPrice,
        color, setColor,
        description, setDescription,
        quantity, setQuantity,
        image, setImage, loginCode} = useContext(Context);
    useEffect(()=>{
      if(loginCode!=0){
        navigate('/login');
      }
        setProductDetails({
            productID: undefined,
            name: '',
            displayName: '',
            imageSource: '',
            price: 0,
            color: '',
            description: '',      
            sellerID: 1,
            availableStocks: 0
          });
          setName('')
          setDisplayName('');
          setPrice('');
          setColor('');
          setDescription('');
          setQuantity('');
    },[])
  return (
    <div className='formSection'>
        <ProductForm btnName={"Add Product"} flag={false}/>
    </div>
  )
}
