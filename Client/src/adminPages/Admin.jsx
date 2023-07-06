import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import Product from '../components/Product/Product';
import './Admin.scss';
import { useNavigate } from 'react-router-dom';
import Context from '../utils/context';
export default function Admin() {
  const {loginCode} = useContext(Context)
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    useEffect(() => {
      if(loginCode!=0){
        navigate('/login');
      }
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/products/get-products',{withCredentials: true});
          setProducts(response.data);
          if(response.status!=200) navigate('/login');
        } catch (error) {
          console.log(error.message);
        }
      };
  
      fetchData();
    }, []);
  return (<>
  <div>

  </div>
    <div className="admin-product-container">
      <div className="left">
        <p>ADMIN PANEL</p>
        <div className="admin-details">
          <span className='c1'>Admin Name:</span><span className='c2'>Kapil</span>
          <span className='c1'>Phone Number:</span><span className='c2'>+91-7988220911</span>
          <span className='c1'>Email-ID:</span><span className='c2'>kapilbadgujjar99@gmail.com</span>
          <span className='c1'>Address:</span><span className='c2'>Jhajjar, Haryana</span>
        </div>
      </div>
      <div className="right">
      <div className="productGrid">
            {
            products.map((product)=>{
                return ( <Product key={product.productID} product={product} flag={false}/> );
                })
            }
        </div>
      </div>
    </div>
    </>
  )
}
