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

  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(1);

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
        setMinPrice(arr[0]);
        setMaxPrice(arr[1]);
      })
      .catch();
  }, []);

  const handleMinValue = (arg: number) => {
    setMinPrice(arg);
  };

  const handleMaxValue = (arg: number) => {
    setMaxPrice(arg);
  };

  return (
    <div className="shop">
      <div className="shop__wrapper">
        <div className="filters shop__filters">
          <Searchbar searchHandler={searchHandler} />
          <Category categoryHandler={categoryHandler} />
          <Brand brandHandler={brandHandler} />
          <PriceRangeSlider
            handleMaxValue={handleMaxValue}
            handleMinValue={handleMinValue}
          />
        </div>
        <Goods
          brand={brand}
          category={category}
          search={search}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </div>
  );
}

export default ShopPage;
