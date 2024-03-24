import {useEffect, useRef, useState} from "react";

import RestraurantCard from "./RestrauntCard";
import CardShimmerContainer from "./cardShimmerContainer";
import FoodInMind from "./FoodInMind";
import { withOpenedLabel } from "./RestrauntCard";

import {RES_LIST_URI} from "../utility/constants";



const Body = () =>
{
    const [ restaurantsList, setRestraurantsList ] = useState([]);
    const [ queriedRestraurants, setQueriedRestraurantsList ] = useState( [] );
    const [ swiggyAPIData, setSwiggyApiData ] = useState( null );
    const [ searchText, setSearchText ] = useState( "" );

    const resContainerRef = useRef( null );
    
    const RestraurantCardOpened = withOpenedLabel(RestraurantCard)
 
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
            queriedRestraurants.length === 0 ?
                <CardShimmerContainer />
                : queriedRestraurants.map( ( restraurantData ) =>
                            {
                                return restraurantData.info.isOpen ?
                        (<RestraurantCardOpened
                            key={restraurantData?.info.id}
                            resData={restraurantData}
                        />)
                        : (<RestraurantCard
                            key={restraurantData?.info.id}
                            resData={restraurantData}
                        />)
                            } )        
        )
    }

    return(
        <div className='tw-p-2'>
            <div className='tw-flex'>
                <div className=''>
                    <input type="text"
                        className=" tw-border tw-border-solid tw-border-green-300 tw-focus-visible:tw-border-green-300"
                        value={searchText}
                        onChange={( event ) =>{
                        setSearchText( event.target.value );
                    }}/>
                    <button
                        className="tw-mx-5 tw-px-5 tw-h-15 tw-w-25 tw-bg-green-300 tw-rounded-md"
                        onClick={searchRestraurants}
                    > Search
                    </button>
                </div>
                <button
                    className="tw-px-5 tw-h-15 tw-w-65 tw-bg-gray-200 tw-rounded-md"
                    onClick={filterRestaurants}
                > Top Rated Restaurants </button>
            </div>
            <div
                className='tw-mt-5'
                ref={resContainerRef}
            >  
                <div className="tw-border-t-[1px]">
                    <FoodInMind
                        foodList = {swiggyAPIData?.data?.cards[0]?.card?.card?.imageGridCards?.info}
                    />
                </div>
                <div className="tw-flex tw-flex-wrap tw-m-5 tw-overflow-x-hidden">
                    {
                        renderRestraurantsList()
                    }
                </div>
            </div>
        </div>
    )
}

export default Body;