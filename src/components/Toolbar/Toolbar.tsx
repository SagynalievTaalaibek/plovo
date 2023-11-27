import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">PLOVO</span>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/new-dish" className="nav-link">New Dish</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;