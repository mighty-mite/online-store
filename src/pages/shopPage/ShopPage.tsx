import { useEffect, useState } from 'react';
import Brand from '../../components/brand/Brand';
import Searchbar from '../../components/searchbar/Searchbar';
import Category from '../../components/category/Category';
import PriceRangeSlider from '../../components/priceRangeSlider/PriceRangeSlider';
import './shop.scss';
import './filters.scss';
import Goods from '../../components/goods/Goods';
import Service from '../../service/Service';

function ShopPage() {
  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState<number[]>([20, 3000]);

  const categoryHandler = (str: string, isChecked: boolean) => {
    if (isChecked) {
      setCategory((state) => [...state, str]);
    } else {
      setCategory((state) => state.filter((item) => item !== str));
    }
  };

  const brandHandler = (str: string, isChecked: boolean) => {
    if (isChecked) {
      setBrand((state) => [...state, str]);
    } else {
      setBrand((state) => state.filter((item) => item !== str));
    }
  };

  const searchHandler = (str: string) => {
    setSearch(() => str.toLowerCase());
  };

  useEffect(() => {
    const service = new Service();
    service
      .getMinMaxPrices()
      .then((arr) => {
        setPrice([arr[0], arr[1]]);
      })
      .catch();
  }, []);

  const priceHandler = (arr: number[]) => {
    setPrice(arr);
  };

  return (
    <div className="shop">
      <div className="shop__wrapper">
        <div className="filters shop__filters">
          <Searchbar searchHandler={searchHandler} />
          <Category categoryHandler={categoryHandler} />
          <Brand brandHandler={brandHandler} />
          <PriceRangeSlider priceHandler={priceHandler} />
        </div>
        <Goods
          brand={brand}
          category={category}
          search={search}
          price={price}
        />
      </div>
    </div>
  );
}

export default ShopPage;
