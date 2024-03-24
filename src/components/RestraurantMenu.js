import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {RES_MENU_URL} from "../utility/constants";
import CardShimmerContainer from "./cardShimmerContainer";
import RestraurantMenuList from "./RestraurantMenuList";

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


    return resInfo === null ? <CardShimmerContainer /> : (
    <>
        <div className="tw-my-10 tw-mx-[300px] tw-flex tw-flex-row tw-items-center tw-justify-between"> 
            <div className="tw-flex tw-flex-col tw-items-center tw-place-content-center">
                    <h1 className="tw-font-bold tw-pl-1">{name}</h1>
                    <h6 className="tw-align-left tw-text-[#7e808c] tw-text-[.73rem] tw-align-left">{cuisines.join( "," )}</h6>
                    <h6 className="tw-align-left tw-text-[#7e808c] tw-text-[.73rem] tw-align-left">{costForTwoMessage}</h6>
                    <h6 className="tw-align-left tw-text-[#7e808c] tw-text-[.73rem] tw-align-left">{sla.lastMileTravelString}</h6>
            </div>
            <div className="">
                <h4>Delivery Time : {sla.deliveryTime}</h4>
                <h5>Max deliveryTime : {sla.maxDeliveryTime}</h5>
                <h4>{ availabilityServiceabilityMessage}</h4>
                <h6>Distance:{sla.lastMileTravelString} </h6>
            </div>
        </div>
        <div className="tw-my-10 tw-mx-[300px] tw-flex tw-flex-col tw-items-center tw-justify-between">
            {menuList && menuList.length > 0 &&
                menuList.map( ( menu ) =>
                {
                    const menuHeaderDetails = Object.values( menu.card.card );
                    if ( menuHeaderDetails[ 0 ] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" ||
                    menuHeaderDetails [0] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" )
                    {
                                            return ( <RestraurantMenuList /> )
                        // return ( 
                        //     <div key={`${menu.card.card.title}${Math.random()}`}>
                        //         <p>{menu.card.card.title}</p>
                        //         {menu.card.card?.categories?.map( ( menuItem ) =>
                        //         {
                        //             return (
                        //                 menuItem?.itemCards?.map( ( card ) => 
                        //                 {
                        //                 }
                        //                 )
                        //             )
                        //         } )
                        //     }
                                       
                        //     </div>
                        // )
                    }
                })
            }
        </div>
    </>
    )
};
export default RestraurantMenu;