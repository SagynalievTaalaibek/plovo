import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { selectCreateDishLoading } from '../../store/dishes/dishesSlice';
import DishForm from '../../components/DishForm/DishForm';
import { createDish } from '../../store/dishes/dishesThunks';
import { ApiDish } from '../../types';

const NewDish: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useSelector(selectCreateDishLoading);

  const onSubmit = async (dish: ApiDish) => {
    await dispatch(createDish(dish));
    navigate('/');
  };


  return (
    <div className='row mt-2'>
      <div className='col'>
        <DishForm onSubmit={onSubmit} isLoading={createLoading} />
      </div>
    </div>
  );
};

export default NewDish;