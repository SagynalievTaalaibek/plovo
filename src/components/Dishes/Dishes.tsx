import DishItem from './DishItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { selectDeleteDishLoading, selectDishes, selectFetchDishLoading } from '../../store/dishes/dishesSlice';
import Spinner from '../Spinner/Spinner';
import { deleteDish, fetchDishes } from '../../store/dishes/dishesThunks';
import { useEffect } from 'react';


const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useSelector(selectDishes);
  const dishesLoading = useAppSelector(selectFetchDishLoading);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const removeDish = async (id: string) => {
    await dispatch(deleteDish(id));
    await dispatch(fetchDishes());
  };

  return (
    <>
      <h4>Dishes</h4>
      {dishesLoading ? <Spinner /> : dishes.map((dish) => (
        <DishItem
          key={dish.id}
          dish={dish}
          deleteLoading={deleteLoading}
          onDelete={() => removeDish(dish.id)}
        />
      ))}
    </>
  );
};

export default Dishes;