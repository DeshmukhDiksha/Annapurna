import {RES_IMG_URI} from "../utility/constants";
import { Link } from "react-router-dom";

const ReasraurantCard = (props) =>{
    const {name, id, costForTwo, cuisines, avgRating, sla, cloudinaryImageId} = props.resData?.info;
    
    return (
        <Link key={id} to={`/restraurants/${ id }`} className="res-card-link">
            <div className='res-card'>
            <div>
                <img className="resLogo" src ={RES_IMG_URI + cloudinaryImageId} alt="resLogo"/>
            </div>
            <h3>{name}</h3>
            <h5>{costForTwo}</h5>
            <h5>{cuisines.join(",")}</h5>
            <h5>Rating {avgRating} </h5>
            <h5>{sla.deliveryTime} min</h5>
            </div>
        </Link>
    )
};

export default ReasraurantCard;