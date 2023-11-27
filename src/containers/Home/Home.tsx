import React from 'react';
import Dishes from '../../components/Dishes/Dishes';
import Cart from '../../components/Cart/Cart';
import {CartDish, Dish} from '../../types';

interface Props {
  dishes: Dish[];
  addToCart: (dish: Dish) => void;
  cartDishes: CartDish[];
}

const Home: React.FC<Props> = ({dishes, addToCart, cartDishes}) => {
  return (
    <div className="row mt-2">
      <div className="col-7">
        <Dishes dishes={dishes} addToCart={addToCart}/>
      </div>
      <div className="col-5">
        <Cart cartDishes={cartDishes}/>
      </div>
    </div>
  );
};

export default Home;