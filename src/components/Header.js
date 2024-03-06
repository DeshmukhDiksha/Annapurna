import {useState} from "react";
import { Link } from "react-router-dom";

const Header = () =>
{
    
    const [ loginBtnText, setLoginBtnText ] = useState( "Login" );

    return(
        <div className='header'>
            <div className='logo-container'>
                <img className="logo" src="App_logo" alt="App logo"/>
            </div>
            <div className='nav-items'>
                <ul>
                    {/* Done use <a>tag to navaigate to particular page asit reloads page */}
                    <li> <Link to="/">Home</Link></li>
                    <li><Link to="/about">About us</Link></li>
                    <li><Link to="/contact">Contact us</Link></li>
                    <li>Cart</li>
                    <button
                        className="login-btn"
                        onClick={() =>
                        {
                            loginBtnText === "Login" ? setLoginBtnText("Logout") : setLoginBtnText("Login");
                        }}
                    >
                        {loginBtnText}
                    </button>
                </ul>
            </div>
        </div>
    )
};

export default Header;