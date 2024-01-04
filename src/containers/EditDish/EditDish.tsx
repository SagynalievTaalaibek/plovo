import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DishForm from '../../components/DishForm/DishForm';
import Spinner from '../../components/Spinner/Spinner';
import { ApiDish } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchOneDish, updateDish } from '../../store/dishes/dishesThunks';
import { selectDish, selectFetchOneDishLoading, selectUpdateDishLoading } from '../../store/dishes/dishesSlice';

const EditDish: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as {id: string};
  const navigate = useNavigate();
  const dish = useAppSelector(selectDish);
  const fetchLoading = useAppSelector(selectFetchOneDishLoading);
  const updateDishLoading = useAppSelector(selectUpdateDishLoading);

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  const onSubmit = async (dish: ApiDish) => {
    await dispatch(updateDish({id, dish}));
    navigate('/');
  };

  const existingDish = dish ? {
    ...dish,
    price: dish.price.toString(),
  } : undefined;

  let formSection = <Spinner />;

  if (!fetchLoading) {
    if (dish) {
      formSection = (
        <DishForm
          onSubmit={onSubmit}
          existingDish={existingDish}
          isLoading={updateDishLoading}
          isEdit
        />);
    } else {
      formSection = <h4>Not found</h4>;
    }
  }

  return (
    <div className='row mt-2'>
      <div className='col'>
        {formSection}
      </div>
    </div>
  );
};

export default EditDish;
