import React from 'react';
import DishForm from '../../components/DishForm/DishForm';
import {Dish} from '../../types';

interface Props {
  onCreate: (dish: Dish) => void;
}

const NewDish: React.FC<Props> = ({onCreate}) => {
  return (
    <div className="row mt-2">
      <div className="col">
        <DishForm onSubmit={onCreate}/>
      </div>
    </div>
  );
};

export default NewDish;