import React from 'react';
import ReactDOM from 'react-dom/client';


import Header from "./components/Header";
import Body from "./components/Body";



/**
 * Header
 *  Logo
 *  Navbar
 * Body
 *  Search
 *  RestraurenatContainer 
 *  ReasraurantCard
 *      Img
 *      ResName,Rating, menus
 * Footer
 *  Copyright
 *  Links
 *  Address
 * 
 */







// const restaurantsData = fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.559485&lng=73.9311784&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
// console.log('✌️restaurantsData --->', restaurantsData);



const AppLayout = () =>{

    return (
        <div className='app'>
            <Header/>
            <Body/>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout/>)