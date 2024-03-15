import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { RootState } from '../../store';
import { increase, decrease, deleteItem } from '../../pages/cartPage/cartSlice';
import './cartItem.scss';

interface Props {
  title: string;
  price: number;
  thumbnail: string;
  id: number;
}

function CartItem(props: Props) {
  const { title, price, thumbnail, id } = props;

  const dispatch = useAppDispatch();

  const cartItem = createSelector(
    (store: RootState) => store.cart.items,
    (pushedItems) => {
      return pushedItems.filter((item) => item.cartProduct.id === id);
    }
  );

  const { amount } = useAppSelector(cartItem)[0];

  const onMinus = () => {
    dispatch(decrease(id));
  };

  const onPlus = () => {
    dispatch(increase(id));
  };

  const onDeleteItem = () => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="cart-item">
      <button
        className="cart-item__delete"
        type="button"
        aria-label="delete item"
        onClick={onDeleteItem}
      />
      <img src={thumbnail} alt="product" className="cart-item__img" />
      <div className="cart-item__title">{title}</div>
      <div className="cart-item__price">{price}</div>
      <div className="cart-item__amount">
        <button onClick={onMinus} type="button">
          -
        </button>
        <span>{amount}</span>
        <button onClick={onPlus} type="button">
          +
        </button>
      </div>
      <div className="cart-item__sum">sum</div>
    </div>
  );
}

export default CartItem;
