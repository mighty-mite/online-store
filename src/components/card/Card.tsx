import { Link } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addItem, getTotalSum } from '../../pages/cartPage/cartSlice';
import { Product } from '../../service/types';
import './card.scss';
import { RootState } from '../../store';

interface Props {
  id: number;
  title: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  description: string;
}

function Card(props: Props) {
  const { id, title, price, stock, brand, category, thumbnail, description } =
    props;
  const dispatch = useAppDispatch();

  const cartItems = createSelector(
    [(state: RootState) => state.cart.items],
    (pushedItems) => pushedItems.map((item) => item.cartProduct)
  );

  const allCartItems = useAppSelector(cartItems);

  const isDisabled = (arr: Product[], itemId: number) => {
    const cartProductsIds = arr.map((item) => item.id);
    return cartProductsIds.includes(itemId);
  };

  const onAddItem = () => {
    dispatch(
      addItem({
        id,
        title,
        price,
        stock,
        brand,
        category,
        thumbnail,
        description,
      })
    );
    dispatch(getTotalSum());
  };

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
        disabled={isDisabled(allCartItems, id)}
        className="card__add"
        type="button"
        onClick={onAddItem}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default Card;
