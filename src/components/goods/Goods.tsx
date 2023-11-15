import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Service from '../../service/Service';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import filter from '../../service/Filter';
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
  brand: string[];
  category: string[];
}

function Goods(props: Props) {
  const [cards, setCards] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(2);

  const { search, brand, category } = props;

  const service = new Service();

  const onProductsLoaded = (products: Product[]) => {
    const filtered = filter(products, brand, category);
    setCards(() => [...filtered]);
    setLoading(() => false);
  };

  const onRequest = () => {
    service
      .getProducts(search)
      .then((data) => {
        onProductsLoaded(data.products);
        setTotalItems(data.total);
        setOffset(0);
      })
      .catch();
  };

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, brand, category]);

  useEffect(() => {
    service.getProducts(search, offset).then((data) => {
      onProductsLoaded(data.products);
      setTotalItems(data.total);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

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

  const handler = (event: React.ChangeEvent<unknown>, page: number) => {
    setOffset(() => 20 * page - 20);
  };

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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          page={offset === 0 ? 1 : offset / 20 + 1}
          onChange={handler}
          color="primary"
          size="large"
          count={Math.ceil(totalItems / 20)}
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default Goods;
