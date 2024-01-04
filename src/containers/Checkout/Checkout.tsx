import CartDishes from '../../components/Cart/CartDishes';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCartDishes } from '../../store/cartSlice';


const Checkout = () => {
  const cartDishes = useAppSelector(selectCartDishes);

  if (cartDishes.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className="row mt-2">
      <div className="col-8 m-auto">
        <h4>Checkout</h4>
        <CartDishes cartDishes={cartDishes}/>
        <div className="d-flex gap-2">
          <Link className="btn btn-danger" to="/">Cancel</Link>
          <Link className="btn btn-primary" to="continue">Continue</Link>
        </div>
        <Outlet/>
      </div>
    </div>
  );
};

export default Checkout;