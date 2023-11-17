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
  const CARDS_PER_PAGE = 20;
  const [, setAllProducts] = useState<Product[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
  const [cardsOnPage, setCardsOnPage] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [skip, setSkip] = useState(0);

  const { search, brand, category } = props;

  const service = new Service();

  const onProductsLoaded = (products: Product[]) => {
    const filtered = filter(products, brand, category, search);
    setProductsFiltered(filtered);

    const visibleItems = filtered.filter((item, i) => i < CARDS_PER_PAGE);

    setCardsOnPage(() => [...visibleItems]);
    setLoading(() => false);
  };

  const onRequest = () => {
    service
      .getProducts()
      .then((data) => {

        setAllProducts(data.products);

        onProductsLoaded(data.products);

      })
      .catch();
  };

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onRequest();
    setOffset(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, brand, category]);


  useEffect(() => {
    const visibleItems = productsFiltered.filter((item, i) => i >= offset && i < offset + CARDS_PER_PAGE)
    setCardsOnPage(visibleItems)
  }, [offset])

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

  const content = renderCards(cardsOnPage);

  const spinner = loading ? <Spinner /> : null;

  const handler = (event: React.ChangeEvent<unknown>, page: number) => {
    setOffset(() => CARDS_PER_PAGE * page - CARDS_PER_PAGE);
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
          page={offset === 0 ? 1 : offset / CARDS_PER_PAGE + 1}
          onChange={handler}
          color="primary"
          size="large"
          count={Math.ceil(productsFiltered.length / CARDS_PER_PAGE)}
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default Goods;
