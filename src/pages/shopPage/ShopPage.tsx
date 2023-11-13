import { useState } from 'react';
import Brand from '../../components/brand/Brand';
import Searchbar from '../../components/searchbar/Searchbar';
import Category from '../../components/category/Category';
import Service from '../../service/Service';
import filter from '../../service/Filter';

import './shop.scss';
import './filters.scss';
import Goods from '../../components/goods/Goods';

function ShopPage() {
  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [search, setSearch] = useState('');

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
    setSearch(() => str);
  };

  return (
    <div className="shop">
      <div className="shop__wrapper">
        <div className="filters shop__filters">
          <Searchbar searchHandler={searchHandler} />
          <Category categoryHandler={categoryHandler} />
          <Brand brandHandler={brandHandler} />
        </div>
        <Goods search={search} />
      </div>
    </div>
  );
}

export default ShopPage;
