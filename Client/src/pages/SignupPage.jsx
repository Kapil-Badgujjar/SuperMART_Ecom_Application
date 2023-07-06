import './StyleSheet.scss';
import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Context from '../utils/context';
import ButtonType1 from '../components/Button/ButtonType1';
export default function SignupPage() {
    const navigate = useNavigate();
    const {userName, setUserName} = useContext(Context);
    const [msg,setMsg] = useState("");
    const [email, setUserEmail] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("");
    const [loading,setLoading] = useState(true);

  function addUser(event){
    event.preventDefault();
    if(userPassword!==userConfirmPassword||newUserName.trim()==""||email.trim()==''||userPassword.trim()=='')
    {
        setMsg("Confirm Password not match");
        setTimeout(()=>{setMsg('')},2000);
        return;
    }
    async function requsetSignup(){
      const response = await axios.post(`http://localhost:5000/user/signup`,{email: email, username: newUserName, password: userPassword},{withCredentials: true}); 
      if(response.status === 200) {
        navigate('/login');
      }
    }
    requsetSignup();
}
  return (
    <div className="outer-container">
      <form onSubmit={addUser} className="container c2">
                <input type="text" placeholder="Enter username " value={newUserName} onChange={(event)=>{setNewUserName(event.target.value)}}/>
                <input type="email" placeholder="Enter email " value={email} onChange={(event)=>{setUserEmail(event.target.value)}}/>
                <input type="password" placeholder="Enter password " value={userPassword} onChange={(event)=>{setUserPassword(event.target.value)}}/>
                <input type="password" placeholder="Confirm Password" value={userConfirmPassword} onChange={(event)=>{setUserConfirmPassword(event.target.value)}}/>
                <span className="error-msg">{msg}</span>
                <hr/>
                <ButtonType1 value={'Sign Up'} />
                <Link to='/login'>Go back to Login page</Link>
            </form>
    </div>
  )
}
