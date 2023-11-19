import { Link } from 'react-router-dom';

import NavBar from '../navbar/NavBar';
import NavSocial from '../nav-social/NavSocial';

import logo from '../../assets/logo.png';

import './footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <Link className="footer__logo-link" to="/">
        <img className="footer__logo" src={logo} alt="logotype" />
      </Link>
      <NavBar />
      <NavSocial />
    </footer>
  );
}

export default Footer;
