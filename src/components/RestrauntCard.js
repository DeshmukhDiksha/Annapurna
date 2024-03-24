import {RES_IMG_URI} from "../utility/constants";
import { Link } from "react-router-dom";

const RestraurantCard = (props) =>{
    const {name, id, costForTwo, cuisines, avgRating, sla, cloudinaryImageId, isOpen} = props.resData?.info;
    
    return (
        <Link key={id} to={`/restraurants/${ id }`} className="tw-res-card-link">
            <div className='tw-flex tw-flex-wrap tw-h-[450px] tw-w-[300px] tw-m-2 tw-border-solid tw-border-b-gray-200 tw-bg-gray-100 hover:'>
            <div>
                <img className="tw-w-[300px] tw-h-[250px] tw-object-fill" src ={RES_IMG_URI + cloudinaryImageId} alt="resLogo"/>
                </div>
                <div className="tw-flex tw-flex-col tw-px-3">
                    <h3>{name}</h3>
                    <h5>{costForTwo}</h5>
                    <h5>{cuisines.join(",")}</h5>
                    <h5>Rating {avgRating} </h5>
                    <h5>{sla.deliveryTime} min</h5>
                </div>
            </div>
        </Link>
    )
};

// Higher order component

// Input - A restraurant card , Output - A Pramoted restraurant card.

export const withOpenedLabel = ( RestraurantCard ) =>
{
    return ( (props) =>
    {
        return (<div>
            <label>OPEN</label>
            <RestraurantCard {...props} />
        </div>)
    } );
};

export default RestraurantCard;