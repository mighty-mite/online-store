import { Link } from 'react-router-dom';

import './card.scss';

interface Props {
  id: number;
  title: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

function Card(props: Props) {
  const { id, title, price, stock, brand, category, thumbnail } = props;

  return (
    <Link className="card" to="/shop">
      <img src={thumbnail} alt={title} className="card__img" width="210" />
      <div className="card__text">
        <h2 className="card__heading">{title}</h2>
        <p className="card__brand">
          <span className="card__brand-span">Brand: </span>
          <span className="card__brand-data">{brand}</span>
        </p>
        <p className="card__price">
          <span className="card__currency">$</span>
          <span className="card__price-data">{price}</span>
        </p>
        <p className="card__color">
          <span className="card__color-span">Category: </span>
          <span className="card__color-data">{category}</span>
        </p>
        <p className="card__amount">
          <span className="card__amount-span">Stock: </span>
          <span className="card__amount-data">{stock}</span>
        </p>
      </div>
    </Link>
  );
}

export default Card;
