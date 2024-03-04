import {useEffect, useState} from "react";

import ReasraurantCard from "./RestrauntCard";
import CardShimmerContainer from "./cardShimmerContainer";
import FoodInMind from "./FoodInMind";



const Body = () =>
{
    const [ restaurantsList, setRestraurantsList ] = useState([]);
    const [ queriedRestraurants, setQueriedRestraurantsList ] = useState( [] );
    const [ swiggyAPIData, setSwiggyApiData ] = useState( null );
    const [ searchText, setSearchText ] = useState( "" );
 
    useEffect( () => {
        fetchData();
    },[]);


    const fetchData = async () =>
    {
        const data = await fetch( "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.559485&lng=73.9311784&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING" );
        const parsedData = await data.json();
        setSwiggyApiData( parsedData );
        console.log( '✌️parsedData --->', parsedData );
        if ( parsedData )
        {
            const resList = parsedData.data?.cards[ 1 ]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            setRestraurantsList( resList );
        }
    };

    const filterRestaurants = () => {
        const topRatedRestraurantsList = restaurantsList.filter( ( restrarant ) => 
            restrarant.info.avgRating > 4.5
        );
        setQueriedRestraurantsList( topRatedRestraurantsList );
    };

    const searchRestraurants = () =>
    {
        if ( searchText === "" )
        {
            setQueriedRestraurantsList([]);
        } else
        {
            const searchedRestraurantsList = restaurantsList.filter( ( restraurant ) =>
            {
                const text = searchText.toLocaleLowerCase();
                return restraurant?.info.name.toLocaleLowerCase().includes(text);
            } );
            setQueriedRestraurantsList( searchedRestraurantsList );
        }
    };

    const renderRestraurantsList =  () =>
    {
        const restaurantList = queriedRestraurants.length === 0 ? restaurantsList : queriedRestraurants;
        return ( 
             restaurantList.length === 0  ? 
                        <CardShimmerContainer />
                        : restaurantList.map( ( restraurantData ) =>
                            {
                                return <ReasraurantCard
                                    key={restraurantData?.info.id}
                                    resData={restraurantData}
                                />
                            } )
        )
    }

    return(
        <div className='body'>
            
            <div className='filter'>
                <div className='search'>
                    <input type="text"
                        className=""
                        value={searchText}
                        onChange={( event ) =>{
                        setSearchText( event.target.value );
                    }}/>
                    <button
                        className="header-btn"
                        onClick={searchRestraurants}
                    > Search
                    </button>
                </div>
                <button
                    className="header-btn filter-btn"
                    onClick={filterRestaurants}
                > Top rated restaurants </button>
            </div>
            <div className='res-container'> 
                <div className="food-in-mind">
                    <FoodInMind
                        foodList = {swiggyAPIData?.data?.cards[0]?.card?.card?.imageGridCards?.info}
                    />
                </div>
                {
                    renderRestraurantsList()
                }
            </div>
        </div>
    )
}

export default Body;