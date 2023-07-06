import { useContext, useState, useEffect } from "react";
import axios from 'axios';
import "./StyleSheet.scss";
import ButtonType1 from '../components/Button/ButtonType1'
import { useNavigate, Link, Navigate } from "react-router-dom";
import Context from "../utils/context";
export default function LoginPage() {
  const {userName, setUserName, userID, setUserID, loginCode, setLoginType, setLoginCode} = useContext(Context);
  const navigate = useNavigate();
  const [email, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    if(loginCode == 1) navigate('/products');
    else if(loginCode == 0) navigate('/admin');
  })

  async function login(event) {
    event.preventDefault();
    if(email.trim().length > 0 && userPassword.trim().length > 0) {
      const {data} = await axios.post(`http://localhost:5000/user/login`,{email: email, password: userPassword},{withCredentials: true});
      console.log(data);
      if( data.code == 0) {
        setUserName(data.username);
        setLoginCode(data.code);
        navigate('/admin');
      }
      else if(data.code==1){
        setUserName(data.username);
        setLoginCode(data.code);
        setLoginType(true)
        setUserID(data.userID);
        navigate('/products');
      }
      else {
        setMsg(data.message);
        setTimeout(() => {
          setMsg('');
        },2000);
        return;
      }
    }
    setMsg('Please enter values properly');
    setTimeout(() =>{setMsg('')},2000);
  }
  return (
    <>
    <div className="outer-container">
      <form onSubmit={login} className="container">
        <input
          type="email"
          placeholder="Enter email "
          value={email}
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter password "
          value={userPassword}
          onChange={(event) => {
            setUserPassword(event.target.value);
          }}
        />
        <span className="error-msg">{msg}</span>
        <hr />
        <ButtonType1 value={'Log In'}/>
        <div>
          <span>Forgot Password </span>
          <Link to="/forgotpassword">Reset password</Link>
        </div>
      </form>     
    </div>
    </>
  );
}
