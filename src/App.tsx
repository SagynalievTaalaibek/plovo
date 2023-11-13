import Toolbar from './components/Toolbar/Toolbar';
import DishForm from './components/DishForm/DishForm';
import Dishes from './components/Dishes/Dishes';
import Cart from './components/Cart/Cart';
import {useState} from 'react';
import {CartDish, Dish} from './types';

const App = () => {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: '1',
      name: 'Plov',
      description: 'Very tasty plov',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Polu.jpg/274px-Polu.jpg',
      price: 250
    },
    {
      id: '2',
      name: 'Another Plov2',
      description: 'Also tasty',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Polu.jpg/274px-Polu.jpg',
      price: 350
    },
    {
      id: '3',
      name: 'Plov3',
      description: 'Very tasty plov',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Polu.jpg/274px-Polu.jpg',
      price: 450
    },
  ]);

  const [cartDishes, setCartDishes] = useState<CartDish[]>([]);

  const addDish = (dish: Dish) => {
    setDishes((prevState) => [...prevState, dish]);
  };


  const addDishToCart = (dish: Dish) => {
    setCartDishes((prevState) => {
      const existingIndex = prevState.findIndex((cartDish) => {
        return cartDish.dish === dish;
      });

      if (existingIndex === -1) {
        const newCartDish: CartDish = {dish, amount: 1};
        return [...prevState, newCartDish];
      } else {
        const itemsCopy = [...prevState];
        const itemCopy = {...itemsCopy[existingIndex]};
        itemCopy.amount++;
        itemsCopy[existingIndex] = itemCopy;
        return itemsCopy;
      }
    });
  };

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main className="container-fluid">
        <div className="row mt-2">
          <div className="col-4">
            <DishForm onSubmit={addDish}/>
          </div>
          <div className="col-4">
            <Dishes dishes={dishes}  addToCart={addDishToCart}/>
          </div>
          <div className="col-4">
            <Cart cartDishes={cartDishes}/>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;