import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Style from './SingleProduct.module.css';
import facebook from '../assets/social_media_icons/facebook.png';
import instagram from '../assets/social_media_icons/instagram.png';
import linkedin from '../assets/social_media_icons/linkedin.png';
import twitter from '../assets/social_media_icons/twitter.png';
import axios from 'axios';
import ButtonType1 from '../components/Button/ButtonType1';
import Context from '../utils/context';
export default function SingleProduct() {
    const {id} = useParams('id');
    const [product, setProduct] = useState(undefined);
    const [msg, setMsg] = useState(false);
    const {userID, loginCode} = useContext(Context);
    const navigate = useNavigate();
    useEffect(() =>{
        async function fun(){
        const {data} = await axios.post('http://localhost:5000/products/singleproduct',{productID: id},{withCredentials: true})
            setProduct(data);
        }
        fun();
      },[])

      async function addToCart(){
        if(loginCode !=1) navigate('/login');
        else{
        const {status,data} = await axios.post('http://localhost:5000/cart/addtocart',{productID: id, userID: userID},{withCredentials: true})
          if(status == 200){
            setMsg(true);
            setTimeout(()=>{
              setMsg(false);
            },1500);
            return;
          }
          else{
            console.log("Error");
          }
        }
      }
    
  return (<>
      {msg && <p className="ProductAdded">Product Added to Cart :&#41;</p>}
    <div className={Style.container}>
      <div className={Style.innercontainer}>
      <div className={Style.left}>
      {product && <img src={"http://localhost:5000/" + product.imageSource} />}
      </div>
      <div className={Style.right}>
        <div className={Style.name}>
        <p>{product?.displayName}</p>
        </div>
        <div className={Style.desc}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident molestias expedita perspiciatis nemo omnis voluptatibus et ad minus quo libero deserunt, repellat vel tenetur temporibus minima. Laudantium aut praesentium maiores mollitia reprehenderit incidunt reiciendis quibusdam eos cum quos sed et voluptatibus quisquam, quas, placeat omnis ad qui ab. Totam, perspiciatis.</p>
        </div>
        {/* <div className={Style.CartController}> */}
          {/* <ButtonType1 value={addToCart} /> */}
          <button onClick={()=>{ addToCart(); }}>Add to Cart</button>
        {/* </div> */}
        <div className={Style.SocialMedia}>
          <span>Share with friends : </span>
          <img src={facebook} alt="facebook"/>
          <img src={instagram} alt="instagram"/>
          <img src={linkedin} alt="linkedin"/>
          <img src={twitter} alt="twitter"/>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}
