import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Product.scss'
export default function Product({product, flag}) {
  const navigate = useNavigate();
  return (
    <div  className={flag ? "productCard":"productRow"} onClick={()=>{ flag ? navigate(`../singleproduct/${product?.productID}`):navigate(`../editproduct/${product?.productID}`)}}>
        <img src={"http://localhost:5000/" + product.imageSource} />
        { !flag && <p>ID : {product.productID}</p> }
        { !flag && <span>Name : {product.displayName}</span>}
        <div>
            {flag && <p>{product.displayName}</p>}
            <p className="price">Price: &#8377;{product.price}</p>
        </div>
    </div>
  )
}
