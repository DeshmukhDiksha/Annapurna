import {useState} from "react";
import {Link} from "react-router-dom";

import {HEADER_NAV_ITEMS} from "../utility/constants";

const Header = () =>
{
    
    const [ loginBtnText, setLoginBtnText ] = useState( "Login" );

    return(
        <div className='flex justify-between m-2 bg-green-200 shadow-md'>
            <div className='flex'>
                <img className="w-50 border-2"  src="utility/icons/app_icon.svg" alt="App_logo"></img> 
            </div>
            <div className='flex'>
                <ul className="flex p-5 m-5">
                    {HEADER_NAV_ITEMS.map( ( navItem,index ) =>
                        <li key={ `hNavItem_${index}`} className="pl-5">
                            <Link to={navItem.navItemRoute}>{navItem.navItemText}</Link>
                        </li>
                    )}
                    <button
                        className="pl-5 w-10"
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