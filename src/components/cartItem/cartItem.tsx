import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from '../../hooks/redux';
import './cartItem.scss';
import { RootState } from '../../store';

interface Props {
  title: string;
  price: number;
  thumbnail: string;
  id: number;
}

function CartItem(props: Props) {
  const { title, price, thumbnail, id } = props;

  // const amount = createSelector(
  //   (store: RootState) => store.cart.items,
  //   (pushedItems) => {
  //     const cart = pushedItems.map((item) => item.cartProduct);
  //     cart.map(cartItem => )
  //   }
  // );

  const onMinus = () => {
    console.log('minus ', id);
  };

  const onPlus = () => {
    console.log('plus ', id);
  };

  return (
    <div className="cart-item">
      <img src={thumbnail} alt="product" className="cart-item__img" />
      <div className="cart-item__title">{title}</div>
      <div className="cart-item__price">{price}</div>
      <div className="cart-item__amount">
        <button onClick={onMinus} type="button">
          -
        </button>
        <span>1</span>
        <button onClick={onPlus} type="button">
          +
        </button>
      </div>
      <div className="cart-item__sum">sum</div>
    </div>
  );
}

export default CartItem;
