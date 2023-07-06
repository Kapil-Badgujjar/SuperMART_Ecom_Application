import './Footer.scss';
import footerimage from '../../assets/Payment_Options.jpg';
export default function Footer() {
  return (
    <div className="footer">
      <div className="mid">
        <p>This is footer section</p>
        <div className="footerbox">
          <div>
            <span>Home</span>
            <span>About</span>
            <span>Login</span>
            <span>Signup</span>
            <span>Help</span>
            <span>Contact Us</span>
          </div>
          <div>
            <span>UserCart</span>
            <span>Products</span>
            <span>Popular Products</span>
            <span>Partners</span>
            <span>Carrear</span>
            <span>Copyrites</span>
          </div>
          <div>
            <span>Developed by Kapil</span>
            <span>+91 7988220911</span>
            <span>kapilbadgujjar99@gmail.com</span>
            <span>VPO Jahazgarh, Jhajjar, Haryana</span>
            <span>PinCode: 124103</span>
            <span>-----</span>
          </div>
        </div>
      </div>
        <div className="footerimage">
          <img src={footerimage} alt="Footer image" />
        </div>
    </div>
  );
}
