import { Link } from 'react-router-dom';

import NavBar from '../navbar/NavBar';

import logo from '../../assets/logo.png';
import heart from '../../assets/heart.svg';
import cart from '../../assets/cart.svg';
import './header.scss';

function Header() {
  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Link className="" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <NavBar />
        <Link className="header__like" to="/">
          <img src={heart} alt="" />
        </Link>
        <Link to="/" className="header__cart">
          <img src={cart} alt="cart" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
