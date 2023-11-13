import {Dish} from '../../types';
import React from 'react';

interface Props {
  dish: Dish;
  onClick: (dish: Dish) => void;
}

const DishItem: React.FC<Props> = ({dish, onClick}) => {
  const noImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6V_R6WMnHzN5bpexR-vQ1tNickx9phBGTHA&usqp=CAU';

  const image = dish.image || noImage;
  const imageStyle = {
    background: `url(${image}) no-repeat center center / cover`
  };

  return (
      <div className="card mb-2" onClick={() => onClick(dish)}>
        <div className="row no-gutters">
          <div className="col-sm-4 rounded-start" style={imageStyle}/>
          <div className="col-sm-8">
            <div className="card-body">
              <h5 className="card-title">{dish.name}</h5>
              <p className="card-text small">{dish.description}</p>
              <p className="card-text">{dish.price} KGS</p>
            </div>
          </div>
        </div>
      </div>
  );
};


export default DishItem;