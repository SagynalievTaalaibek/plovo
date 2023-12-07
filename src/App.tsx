import {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Home from './containers/Home/Home';
import NewDish from './containers/NewDish/NewDish';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Order/Order';
import EditDish from './containers/EditDish/EditDish';
import axiosApi from './axiosApi';
import {CartDish, Dish, DishesList} from './types';

function App() {
  const location = useLocation();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartDishes, setCartDishes] = useState<CartDish[]>([]);

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);

      const dishesResponse = await axiosApi.get<DishesList | null>('dishes.json');
      const dishes = dishesResponse.data;

      if (!dishes) {
        return;
      }

      const newDishes = Object.keys(dishes).map((id) => {
        const dish = dishes[id];
        return {
          ...dish,
          id,
        };
      });

      setDishes(newDishes);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchDishes();
    }
  }, [location.pathname, fetchDishes]);

  const deleteDish = async (id: string) => {
    if (window.confirm('Do you really want to delete?')) {
      await axiosApi.delete('dishes/' + id + '.json');

      setCartDishes((prevState) => {
        return prevState.filter(cartDish => {
          return cartDish.dish.id !== id;
        });
      });

      await fetchDishes();
    }
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
        <Routes>
          <Route path="/" element={(
            <Home
              dishesLoading={loading}
              dishes={dishes}
              addToCart={addDishToCart}
              cartDishes={cartDishes}
              deleteDish={deleteDish}
            />
          )} />
          <Route path="/new-dish" element={<NewDish />} />
          <Route path="/edit-dish/:id" element={<EditDish/>}/>
          <Route path="/checkout" element={(
            <Checkout cartDishes={cartDishes}/>
          )} >
            <Route path="continue" element={(
              <Order cartDishes={cartDishes}/>
            )}/>
          </Route>
          <Route path="*" element={(<h1>Not Found!</h1>)}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
