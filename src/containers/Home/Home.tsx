import Dishes from '../../components/Dishes/Dishes';
import Cart from '../../components/Cart/Cart';


const Home = () => {
  return (
    <div className='row mt-2'>
      <div className='col-7'>
        <Dishes />
      </div>
      <div className='col-5'>
        <Cart />
      </div>
    </div>
  );
};

export default Home;