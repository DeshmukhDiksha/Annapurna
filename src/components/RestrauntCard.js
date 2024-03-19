import {RES_IMG_URI} from "../utility/constants";
import { Link } from "react-router-dom";

const ReasraurantCard = (props) =>{
    const {name, id, costForTwo, cuisines, avgRating, sla, cloudinaryImageId} = props.resData?.info;
    
    return (
        <Link key={id} to={`/restraurants/${ id }`} className="res-card-link">
            <div className='flex flex-wrap h-[450px] w-[300px] m-2 border-solid border-b-gray-200 bg-gray-100 hover: bg-gray-400'>
            <div>
                <img className="w-[300px] h-[250px] object-fill" src ={RES_IMG_URI + cloudinaryImageId} alt="resLogo"/>
                </div>
                <div className="flex flex-col px-3">
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

export default ReasraurantCard;