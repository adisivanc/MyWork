import React,{ useState } from 'react';
import { logoURL } from '../Utilis/constant';
import { Link } from 'react-router-dom';

const Header = () => {

  const [logInfo,setLogInfo] = useState("Login");

  return (
    <header>
        <img src={logoURL} alt='Logo' title='Logo' />
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/aboutus">About Us</Link>
            </li>
            <li>
                <Link to="/services">Services</Link>
            </li>
            <li>
                <Link to="/careers">Careers</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
            <li>
                <input type='button' value={logInfo} onClick={()=> logInfo==="Login"?setLogInfo("Logout"):setLogInfo("Login")}/>
            </li>
        </ul>
    </header>
  )
}

export default Header