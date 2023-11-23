import { useState, useEffect, useCallback } from 'react';
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
  price: number[];
}

function Goods(props: Props) {
  const CARDS_PER_PAGE = 20;
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
  const [cardsOnPage, setCardsOnPage] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const { search, brand, category, price } = props;

  const onProductsLoaded = useCallback(
    (products: Product[]) => {
      const filtered = filter(products, brand, category, search, price);
      setProductsFiltered(filtered);

      const visibleItems = filtered.filter((item, i) => i < CARDS_PER_PAGE);

      setCardsOnPage(() => [...visibleItems]);
      setLoading(() => false);
    },
    [brand, search, category, price]
  );

  const getData = useCallback(() => {
    const service = new Service();
    service
      .getProducts()
      .then((data) => {
        setAllProducts(data.products);
      })
      .catch();
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    onProductsLoaded(allProducts);
    setOffset(0);
  }, [search, brand, category, price, allProducts, onProductsLoaded]);

  useEffect(() => {
    const visibleItems = productsFiltered.filter((_item, i) => {
      return i >= offset && i < offset + CARDS_PER_PAGE;
    });
    setCardsOnPage(visibleItems);
  }, [offset, productsFiltered]);

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

  const handler = (_event: React.ChangeEvent<unknown>, page: number) => {
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
