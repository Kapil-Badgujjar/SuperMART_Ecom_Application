import React, { useContext, useEffect } from 'react'
import './Success.scss'
// import axios from 'axios'
// import { useNavigate, useParams } from 'react-router-dom'
// import Context from '../../utils/context';
export default function Success() {
    // const {userID} = useParams('userID');
    // const navigate = useNavigate();
    // const {userID} = useContext(Context);
    // useEffect(()=>{
    //     // async function fun(){
    //     //     const {status,data} = await axios.post('http://localhost:5000/payments/order-successful', {userID: userID}, {withCredentials: true});
    //     //     console.log(data);
    //     //     if(status!=200){
    //     //         navigate('/cancel');
    //     //     }
    //     // }
    //     // fun();
    // },[]);
  return (
    <div class="successfulPaymentContainer">
        <h1>Payment successfull...</h1>
    </div>
  )
}
