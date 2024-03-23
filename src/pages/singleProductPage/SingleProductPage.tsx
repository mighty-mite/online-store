import { useState, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import Service from '../../service/Service';
import Spinner from '../../components/spinner/Spinner';
import './singlePropuctPage.scss';
import { Product } from '../../service/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addItem, getTotalSum } from '../cartPage/cartSlice';
import { RootState } from '../../store';

function View(product: Product | undefined) {
  const dispatch = useAppDispatch();

  const cartItems = createSelector(
    [(state: RootState) => state.cart.items],
    (pushedItems) => pushedItems.map((item) => item.cartProduct)
  );

  const allCartItems = useAppSelector(cartItems);

  const { productId } = useParams();

  const isDisabled = (arr: Product[], itemId: number) => {
    const cartProductsIds = arr.map((item) => item.id);
    return cartProductsIds.includes(itemId);
  };

  isDisabled(allCartItems, Number(productId));
  if (product === undefined) return <Spinner />;

  const { thumbnail, title, price, description, id, stock, brand, category } =
    product;

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
    <section className="product">
      <div className="product__wrapper wrapper">
        <div className="product__imgs">
          <img src={thumbnail} alt="" />
        </div>
        <div className="product__info">
          <h1 className="product__title">{title}</h1>
          <p className="product__price">${price}</p>
          <button
            disabled={isDisabled(allCartItems, Number(productId))}
            className="product__add"
            type="button"
            onClick={onAddItem}
          >
            Add To Cart
          </button>
          <h2 className="product__title-description">Product Description</h2>
          <p className="product__description">{description}</p>
        </div>
      </div>
    </section>
  );
}

function SingleProductPage() {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product>();

  const onProductLoaded = (item: Product) => {
    setProduct(item);
  };

  useEffect(() => {
    const service = new Service();
    const updateProduct = () => {
      if (productId === undefined) return;
      service.getSingleProduct(productId).then(onProductLoaded);
    };
    updateProduct();
  }, [productId]);

  return View(product);
}

export default SingleProductPage;
