import { useState, useEffect } from 'react';
import Service from '../../service/Service';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import './goods.scss';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface Props {
  search: string;
}

function Goods(props: Props) {
  const [cards, setCards] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { search } = props;

  const service = new Service();

  const onProductsLoaded = (products: Product[]) => {
    setCards(() => [...products]);
    setLoading(() => false);
  };

  const onRequest = () => {
    service.getProducts(search).then(onProductsLoaded).catch();
  };

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const renderCards = (arr: Product[]) => {
    const items = arr.map((card) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          price={card.price}
          stock={card.stock}
          brand={card.brand}
          category={card.category}
          thumbnail={card.thumbnail}
        />
      );
    });
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{items}</>;
  };

  const content = renderCards(cards);

  const spinner = loading ? <Spinner /> : null;

  return (
    <div className="goods">
      <div className="goods__top">
        <div className="goods__top-left">
          <p className="goods__sort">Sort by:</p>
          {/* <Sort /> */}
        </div>
        <div className="goods__top-right">
          <button
            className="goods__layout-button goods__layout-button--tile chosen"
            type="button"
            aria-label="tile-layout"
          />
          <button
            className="goods__layout-button goods__layout-button--list"
            type="button"
            aria-label="list-layout"
          />
        </div>
      </div>
      <div className="goods__wrapper">
        {content}
        {spinner}
      </div>
      {/* <Pagination/> */}
    </div>
  );
}

export default Goods;
