import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../utils/context';

export default function LogoutPage() {
  const navigate = useNavigate();
  const { setUserName, setLoginCode, setLoginType } = useContext(Context);

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/logout',{withCredentials: true});
        if (response.status === 200) {
          console.log(response.data);
          setUserName(undefined);
          setLoginType(false);
          setLoginCode(-1);
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    logout();
  }, [navigate, setUserName]);

  return (
    <div className='Empty-msg'>
      <p>Redirecting to Login page...</p>
    </div>
  );
}
