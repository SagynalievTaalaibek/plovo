import {useCallback, useEffect, useState} from 'react';
import Spinner from '../../components/Spinner/Spinner';
import axiosApi from '../../axiosApi';
import {ApiOrders, Order} from '../../types';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const ordersResponse = await axiosApi.get<ApiOrders | null>('orders.json');
      const ordersData = ordersResponse.data;

      if (!ordersData) {
        return setOrders([]);
      }

      const newOrders: Order[] = Object.keys(ordersData).map((id) => {
        const order = ordersData[id];
        const totalPrice = order.dishes.reduce((sum, cartDish) => {
          return sum + cartDish.amount * cartDish.dish.price;
        }, 0);

        return {
          ...order,
          id,
          totalPrice,
        };
      });

      setOrders(newOrders);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="row mt-2">
      <div className="col">
        <h4 className="mb-2">Orders</h4>
        {loading ? <Spinner/> : orders.map((order) => (
          <div className="card mb-2" key={order.id}>
            <div className="card-body">
              <strong>{order.customer.name} </strong>
              <span>Order for a total price of </span>
              <strong>{order.totalPrice}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;