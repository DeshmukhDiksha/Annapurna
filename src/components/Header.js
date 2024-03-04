import {useState} from "react";

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
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
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