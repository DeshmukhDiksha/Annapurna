import {useEffect, useRef, useState} from "react";

import ReasraurantCard from "./RestrauntCard";
import CardShimmerContainer from "./cardShimmerContainer";
import FoodInMind from "./FoodInMind";

import {RES_LIST_URI} from "../utility/constants";



const Body = () =>
{
    const [ restaurantsList, setRestraurantsList ] = useState([]);
    const [ queriedRestraurants, setQueriedRestraurantsList ] = useState( [] );
    const [ swiggyAPIData, setSwiggyApiData ] = useState( null );
    const [ searchText, setSearchText ] = useState( "" );

    const resContainerRef = useRef(null);
 
    useEffect( () => {
        fetchData();
        return ( () =>
        {
            removeScrollListner();
        })
    },[]);

    useEffect( () =>
    {
        searchRestraurants();
    }, [ searchText ] );

    const fetchData = async () =>
    {
        const data = await fetch(RES_LIST_URI );
        const parsedData = await data.json();
        setSwiggyApiData( parsedData );
        if ( parsedData )
        {
            const resList = parsedData.data?.cards[ 1 ]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            setRestraurantsList( resList );
            setQueriedRestraurantsList( resList );
            attachScrollListner();
        }
    };

    const attachScrollListner = () =>
    {
        // console.log( "^resContainerRef", resContainerRef.current );
        // resContainerRef.current.addEventListner( "scroll", handleOnScroll );
    };

    const removeScrollListner = () =>
    {
        // resContainer.removeEventListner( "scroll", handleOnScroll );
    };
    const handleOnScroll = () =>
    {
        // console.log( "Handle scroll!!" );
    };

    const filterRestaurants = () => {
        const topRatedRestraurantsList = queriedRestraurants.filter( ( restrarant ) => 
            restrarant.info.avgRating > 4.5
        );
        setQueriedRestraurantsList( topRatedRestraurantsList );
    };

    const searchRestraurants = () =>
    {
        if ( searchText === "" )
        {
            // TODO: Check for other filter and assign the list with filters.
            setQueriedRestraurantsList(restaurantsList);
        } else
        {
            const searchedRestraurantsList = queriedRestraurants.filter( ( restraurant ) =>
            {
                const text = searchText.toLocaleLowerCase();
                return restraurant?.info.name.toLocaleLowerCase().includes(text);
            } );
            setQueriedRestraurantsList( searchedRestraurantsList );
        }
    };

    const renderRestraurantsList =  () =>
    {
        return ( 
             queriedRestraurants.length === 0  ? 
                        <CardShimmerContainer />
                        : queriedRestraurants.map( ( restraurantData ) =>
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
            <div
                className='res-container'
                ref={resContainerRef}
            >  
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