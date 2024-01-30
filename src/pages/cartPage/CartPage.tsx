import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CartItem from '../../components/cartItem/cartItem';
import { useAppSelector } from '../../hooks/redux';
import './cartPage.scss';

function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <section id="cart-page" className="cart">
      <div className="cart__center">
        <div className="cart__head">
          <div className="cart__head-item" />
          <div className="cart__head-item">Item</div>
          <div className="cart__head-price">Price</div>
          <div className="cart__head-amount">Amount</div>
          <div className="cart__head-subtotal">Subtotal</div>
        </div>
        <div className="cart__items">
          {cartItems.length === 0
            ? 'Cart is empty, let&apos;s go shopping!'
            : cartItems.map((item) => (
                <CartItem
                  key={uuidv4()}
                  title={item.title}
                  price={item.price}
                  thumbnail={item.thumbnail}
                />
              ))}
        </div>
        <div className="cart__controls">
          <Link className="cart__go-shopping-btn" to="/">
            Continue Shopping
          </Link>
          <button className="cart__clear-btn" type="button">
            Clear Cart
          </button>
        </div>
        <div className="total cart__total">
          <div className="total__sub">
            <span className="total__sub-text">Subtotal:</span>
            <span className="total__sub-value">$</span>
          </div>
          <div className="total__shipping">
            <span className="total__shipping-text">Shipping fee:</span>
            <span className="total__shipping-value">$</span>
          </div>
          <div className="total__bottom">
            <span className="total__bottom-text">Total: </span>
            <span className="total__bottom-value">$</span>
          </div>
          {/* <input className="total__promo" placeholder="Promo code..." /> */}
          <button className="total__buy" type="button">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
