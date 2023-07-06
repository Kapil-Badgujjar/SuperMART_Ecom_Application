import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route, useNavigate} from 'react-router-dom';
import Header from '../src/components/Header/Header'
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UpdatePassword from './pages/UpdatePasswordPage';
import ProductsPage from './pages/ProductsPage'
import SingleProduct from './pages/SingleProduct';
import UserCart from './pages/UserCart';

import Success from './components/PaymentSuccess/Success';
import Cancel from './components/PaymentCancel/Cancel'

import AdminPanel from './adminPages/Admin';
import AddProduct from './components/AdminForm/AddProduct';
import EditProduct from './components/AdminForm/EditProduct';

import Footer from './components/Footer/Footer'

import { useEffect,useState,useContext } from 'react';
import axios from 'axios';
import Context from './utils/context';
  
  
function App() { 
    const {userName, setUserName, userID, setUserID, loginCode, setLoginType, setLoginCode} = useContext(Context);
    const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Header />}>
          <Route index element = {<LoginPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='logout' element={< LogoutPage />} />
          <Route path='products' element={< ProductsPage />} />
          <Route path='signup' element={< SignupPage />} />
          <Route path='forgotpassword' element={< ForgotPasswordPage />} />
          <Route path='admin' element={< AdminPanel />} />
          <Route path='addproduct' element={< AddProduct/>} />
          <Route path='editproduct/:id' element={< EditProduct/>} />
          <Route path='singleproduct/:id' element={< SingleProduct />} />
          <Route path='usercart' element={< UserCart />} />
          <Route path='success' element={<Success />} />
          <Route path='cancel' element={<Cancel />} />
          <Route path='updatepassword/:token' element={< UpdatePassword />} />
        </Route>
    )
  )

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fun(){
    const {status, data} = await axios.get('http://localhost:5000/user/checkSessionExists',{withCredentials:true});
    console.log(data);
      if(status === 200){
        setUserName(data.username);
        setLoginCode(data.code);
        setUserID(data.userID);
        setLoginType(data.userID? true:false)
      }
    }
    fun();
    setLoading(false);
}, []);

if(loading) {
  return (
    <>
      <h1>Loading</h1>
    </>
  )
}


  return (
    <div>
        <RouterProvider router={router} />
        <Footer />
    </div>
  )
}
export default App
