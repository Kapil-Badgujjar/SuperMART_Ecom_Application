import './HeaderStyle.scss';
import { useContext, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import  Context  from '../../utils/context';
export default function header(){
    const {userName, loginCode, loginType,  } = useContext(Context);
    const navigate = useNavigate();
    useEffect(()=>{
        {userName && navigate('/products')}
    },[]);
    return (
        <>
            <div className="navBar">
                <div className="logoSection">
                    {/* <div className={headerStyle.logoImageDiv}><img className={headerStyle.logoImage} src={logoImage} /></div> */}
                    <p>Super MART</p>
                </div>
                <div className="controlSection">
                    <Link to='/'>HOME</Link>
                    { (loginCode!=0 && loginCode!=1) && <Link to='/products'>PRODUCTS</Link> }
                    { loginCode==1 && <span>{userName}</span> }
                    { loginCode==0 && <Link to='/addproduct'>ADD NEW PRODUCT</Link>}
                    {/* <Link to='/about'>About Us</Link> */}
                    { !userName && <Link to='/login'>LOGIN</Link> }
                    {(!userName )? <Link to='/signup'>SIGNUP</Link> : <Link to='/logout'>LOGOUT</Link>}
                    { loginType && <Link to='/usercart'>CART</Link>}
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}