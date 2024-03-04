import {MIND_FOOD_IMG_URI} from "../utility/constants";

const FoodInMind = ( props ) =>{
    const {foodList} = props;
    console.log( '✌️props --->', foodList );
    return (
        <div className="food-in-mind-container">
            <h1>Whats on your mind ? </h1>
            <div className="food-in-mind">
                {foodList && foodList.length > 0 && foodList.map(
                    ( food ) => <img key={food.id } className="food-in-mind-img" src={MIND_FOOD_IMG_URI + "/" + food.imageId} />
                )};
            </div>
        </div>
    )
};

export default FoodInMind;
