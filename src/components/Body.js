import {useEffect, useState} from "react";

import ReasraurantCard from "./RestrauntCard";
import CardShimmerContainer from "./cardShimmerContainer";
import FoodInMind from "./FoodInMind";




const Body = () =>
{
    const [ topRatedRestraurants, setTopRatedRestraurantsList ] = useState( [] );
    const [ swiggyAPIData, setSwiggyApiData ] = useState( null );

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
            setTopRatedRestraurantsList( resList );
        }
    };

    const filterRestaurants = () => {
        const topRatedRestraurantsList = topRatedRestraurants.filter( ( restrarant ) => 
            restrarant.info.avgRating > 4.5
        );
        setTopRatedRestraurantsList( topRatedRestraurantsList );
    };

    return(
        <div className='body'>
            {/* <div className='search'> Search </div> */}
            {/* <div className='filter'>
                <button
                    className="filter-btn"
                    onClick={filterRestaurants}
                > Top rated restaurants </button>
            </div> */}
            <div className='res-container'> 
                <div className="food-in-mind">
                    <FoodInMind
                        foodList = {swiggyAPIData?.data?.cards[0]?.card?.card?.imageGridCards?.info}
                    />
                </div>
                {
                    topRatedRestraurants.length === 0 ?
                        <CardShimmerContainer />
                        : topRatedRestraurants.map( ( restrarantData ) =>
                            {
                                return <ReasraurantCard
                                    key={restrarantData?.info.id}
                                    resData={restrarantData}
                                />
                            } )
                }
            </div>
        </div>
    )
}

export default Body;