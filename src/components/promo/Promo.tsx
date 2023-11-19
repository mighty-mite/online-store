import { Link } from 'react-router-dom';

import './promo.scss';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__heading">Cosmetics</h1>
      <p className="promo__slogan">Gift to you!</p>
      <p className="promo__offer">40% off everything</p>
      <Link to="/shop" className="promo__link">
        Shop Now
      </Link>
    </section>
  );
}

export default Promo;
