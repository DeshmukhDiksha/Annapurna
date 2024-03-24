import {MIND_FOOD_IMG_URI} from "../utility/constants";

const FoodInMind = ( props ) =>{
    const {foodList} = props;
    return (
        <div className="tw-flex tw-flex-col">
            <h1>Whats on your mind ? </h1>
            <div className="tw-flex tw-mx-24 tw-py-5 tw-flex-wrap">
                {foodList && foodList.length > 0 && foodList.map(
                    ( food ) => <img key={food.id } className="tw-h-24 tw-w-24 tw-p-15" src={MIND_FOOD_IMG_URI + "/" + food.imageId} />
                )}
            </div>
        </div>
    )
};

export default FoodInMind;
