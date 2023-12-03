import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../../service/Service';
import Spinner from '../../components/spinner/Spinner';
import './singlePropuctPage.scss';
import { Product } from '../../service/types';

function View(product: Product | undefined) {
  if (product === undefined) return <Spinner />;
  const { thumbnail, title, price, description } = product;

  return (
    <section className="product">
      <div className="product__wrapper wrapper">
        <div className="product__imgs">
          <img src={thumbnail} alt="" />
        </div>
        <div className="product__info">
          <h1 className="product__title">{title}</h1>
          <p className="product__price">${price}</p>
          <button className="product__add" type="button">
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
