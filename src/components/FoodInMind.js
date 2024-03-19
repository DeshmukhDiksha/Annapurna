import {MIND_FOOD_IMG_URI} from "../utility/constants";

const FoodInMind = ( props ) =>{
    const {foodList} = props;
    return (
        <div className="flex flex-col">
            <h1>Whats on your mind ? </h1>
            <div className="flex mx-24 py-5 flex-wrap">
                {foodList && foodList.length > 0 && foodList.map(
                    ( food ) => <img key={food.id } className="h-24 w-24 p-15" src={MIND_FOOD_IMG_URI + "/" + food.imageId} />
                )}
            </div>
        </div>
    )
};

export default FoodInMind;
