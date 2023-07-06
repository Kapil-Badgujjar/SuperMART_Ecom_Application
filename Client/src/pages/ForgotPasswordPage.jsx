import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import ButtonType1 from '../components/Button/ButtonType1'
import axios from 'axios';
import './StyleSheet.scss';
export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setUserEmail] = useState("");
    function forgotPassword(event){
        event.preventDefault();
        async function fun(){
            const {status,data} = await axios.post(`http://localhost:5000/user/forgotPassword`,{email: email},{withCredentials: true});
            if(status==200){
                navigate('/login');
            }
        }
        fun();
    }
  return (
    <div className="outer-container">
        <form className="container" onSubmit={forgotPassword}>
            <label>E-mail ID: </label>
            <input type="email" placeholder="Enter email " value={email} onChange={(event)=>{setUserEmail(event.target.value)}}/>
            {/* <input className={userFormStyle.submitbtn} type="submit" value="Submit"/> */}
            <hr/>
            <ButtonType1 value={'Submit'} />
            <Link to='/login'>Go back to Login page</Link>
        </form>
    </div>
  )
}
