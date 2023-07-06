import { useContext, useState, useEffect } from "react";
import  "./StyleSheet.scss";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import ButtonType1 from "../components/Button/ButtonType1";
// import Context from '../../utils/context';
export default function UpdatePassword() {
  // const {userName, setUserName} = useContext(Context);
  const {token} = useParams('token');
  console.log(token);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    async function fun()
   { const {status} = await axios.get(`http://localhost:5000/user/activatepasswordreset/${token}`);
    if(status !== 200){
        navigate('/');
    }
      setLoading(false);}
      fun();
  },[])

  if(loading) {
    return (
      <>
        <h1>Loading</h1>
      </>
    )
  }
  // if(userName) navigate('/products')
  function update(event) {
    event.preventDefault();
    if(newPassword.trim()==""||confirmPassword.trim()==""){
      setMsg("Please enter proper values");
      return;
    }
    if(newPassword!=confirmPassword){
        setMsg('Please enter same value in confirm password');
        return;
    }
    async function Fun(){
      const {status,data} = await axios.post(`http://localhost:5000/user/resetpassword`, {password: newPassword }, {withCredentials: true});
      if(status === 200){
        alert("Password reset successful");
        navigate("/");
      }else{
        alert("Password reset failed");
      }
    }
    Fun();
  }
  return (
    <>
      <div className="outer-container">
        <form className="container" onSubmit={update}>
          <input
            type="passowrd"
            placeholder="Enter New Password "
            value={newPassword}
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Confirm password "
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
          <p className="error-msg">{msg}</p>
          <hr/>
          <ButtonType1
            type="submit"
            value="Update"
          />
          {/* <div><span>Forgot Password </span><Link to='/forgotpassword'>Reset password</Link></div> */}
        </form>
      </div>
    </>
  );
}
