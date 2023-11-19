import { Link } from 'react-router-dom';

import './navbar.scss';

function NavBar() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link className="nav__link" to="/">
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/shop">
            Shop
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
