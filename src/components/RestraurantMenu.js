import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {RES_MENU_URL} from "../utility/constants";
import CardShimmerContainer from "./cardShimmerContainer";

const RestraurantMenu = () =>
{

    const [ resInfo, setResInfo ] = useState( null );

    const {resId} = useParams();

    useEffect( () =>
    {
        fetchRestraurantMenu();
    }, [] );
    
    const fetchRestraurantMenu = async() =>
    {
        const data = await fetch( `${RES_MENU_URL}${resId}` );
        const json = await data.json();
        setResInfo( json.data );
    };


    if ( resInfo === null ) return <CardShimmerContainer /> 
    
    const {name, costForTwoMessage, cuisines, sla, availabilityServiceabilityMessage} = resInfo?.cards[ 0 ]?.card?.card?.info;
    const menuList = resInfo?.cards[ 2 ].groupedCard?.cardGroupMap?.REGULAR?.cards;


    return resInfo === null ? <CardShimmerContainer/> :  (
        <div>
            <h1>{name}</h1>
            <h2>{cuisines.join( "," )}</h2>
            <h3>{costForTwoMessage}</h3>
            <h4>{sla.lastMileTravelString}</h4>
            <h4>Delivery Time : {sla.deliveryTime}</h4>
            <h5>Max deliveryTime : {sla.maxDeliveryTime}</h5>
            <h4>{ availabilityServiceabilityMessage}</h4>
            <h6>Distance:{sla.lastMileTravelString} </h6>
            
            {menuList && menuList.length > 0 &&
                menuList.map( ( menu ) =>
                {
                    const menuHeaderDetails = Object.values( menu.card.card );
                    if ( menuHeaderDetails[ 0 ] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" ||
                    menuHeaderDetails [0] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" )
                    {
                        return ( 
                            <div key={`${menu.card.card.title}${Math.random()}`}>
                                <p>{menu.card.card.title}</p>
                                {menu.card.card?.categories?.map( ( menuItem ) =>
                                {
                                    return (
                                        menuItem?.itemCards?.map((card) => <div key={card?.card.info?.id}>
                                                <ul>
                                                    <li >{card?.card.info?.name}</li>
                                                </ul> 
                                        </div>
                                        )
                                    )
                                } )
                            }
                                       
                            </div>
                        )
                    }
                })
            }
        </div>
    )
};
export default RestraurantMenu;