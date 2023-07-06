import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import "./StyleSheet.scss";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product/Product";
import Banner from "../components/Banner/Banner";
import Context from "../utils/context";
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const {loginCode} = useContext(Context)
  const navigate = useNavigate();

  useEffect(()=>{
    if(loginCode == 0 ){
      navigate('/admin');
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/get-products",{withCredentials: true});
        setProducts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Banner />
      <div className="products-container">
        {products.map((product) => {
          return <Product key={product.productID + "P"} product={product} flag={true}/>;
        })}
      </div>
    </>
  );
}
