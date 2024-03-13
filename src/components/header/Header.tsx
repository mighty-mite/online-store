import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import NavBar from '../navbar/NavBar';

import logo from '../../assets/logo.png';
import cart from '../../assets/cart.svg';
import './header.scss';

function Header() {
  const { items } = useAppSelector((state) => state.cart);
  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Link className="" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <NavBar />
        <Link to="/cart" className="header__cart">
          <span className="header__badge">{items.length}</span>
          <img src={cart} alt="cart" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
