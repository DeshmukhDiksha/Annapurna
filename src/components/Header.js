import {useState} from "react";
import {Link} from "react-router-dom";

import {HEADER_NAV_ITEMS} from "../utility/constants";

const Header = () =>
{
    
    const [ loginBtnText, setLoginBtnText ] = useState( "Login" );

    return(
        <div className='tw-flex tw-justify-between tw-m-2 tw-bg-green-200 tw-shadow-md'>
            <div className='tw-flex'>
                <img className="tw-w-50 tw-border-2"  src="utility/icons/app_icon.svg" alt="App_logo"></img> 
            </div>
            <div className='tw-flex'>
                <ul className="tw-flex tw-p-5 tw-m-5">
                    {HEADER_NAV_ITEMS.map( ( navItem,index ) =>
                        <li key={ `hNavItem_${index}`} className="tw-pl-5">
                            <Link to={navItem.navItemRoute}>{navItem.navItemText}</Link>
                        </li>
                    )}
                    <button
                        className="tw-pl-5 tw-w-10"
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