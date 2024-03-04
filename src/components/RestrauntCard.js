import {RES_IMG_URI} from "../utility/constants";

const ReasraurantCard = (props) =>{
    const{name,costForTwo,cuisines,avgRating,sla, cloudinaryImageId} = props.resData?.info;
    return (
        <div className='res-card' >
            <div>
                <img className="resLogo" src ={RES_IMG_URI + cloudinaryImageId} alt="resLogo"/>
            </div>
            <h3>{name}</h3>
            <h5>{costForTwo}</h5>
            <h5>{cuisines.join(",")}</h5>
            <h5>Rating {avgRating} </h5>
            <h5>{sla.deliveryTime} min</h5>
        </div>
    )
};

export default ReasraurantCard;