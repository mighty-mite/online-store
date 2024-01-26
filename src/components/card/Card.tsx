import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { addItem } from '../../pages/cartPage/cartSlice';
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
  const dispatch = useAppDispatch();
  return (
    <div className="card">
      <Link to={`/shop/${id}`}>
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
      <button
        className="card__add"
        type="button"
        onClick={() =>
          dispatch(
            addItem({ id, title, price, stock, brand, category, thumbnail })
          )
        }
      >
        Add To Cart
      </button>
    </div>
  );
}

export default Card;
