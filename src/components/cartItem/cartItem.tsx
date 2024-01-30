import './cartItem.scss';

interface Props {
  title: string;
  price: number;
  thumbnail: string;
}

function CartItem(props: Props) {
  const { title, price, thumbnail } = props;
  return (
    <div className="cart-item">
      <img src={thumbnail} alt="product" className="cart-item__img" />
      <div className="cart-item__title">{title}</div>
      <div className="cart-item__price">{price}</div>
      <div className="cart-item__amount">
        <button type="button">-</button>
        <span>1</span>
        <button type="button">+</button>
      </div>
      <div className="cart-item__sum">sum</div>
    </div>
  );
}

export default CartItem;
