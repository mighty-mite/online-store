import { useEffect, useState } from 'react';
import Brand from '../../components/brand/Brand';
import Searchbar from '../../components/searchbar/Searchbar';
import Category from '../../components/category/Category';
import PriceRangeSlider from '../../components/priceRangeSlider/PriceRangeSlider';
import {
  addCategory,
  removeCategory,
  addBrand,
  removeBrand,
  addSearchQuery,
  fetchPrices,
  setMaxPrice,
  setMinPrice,
} from './shopPageSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Goods from '../../components/goods/Goods';
import Service from '../../service/Service';
import './shop.scss';
import './filters.scss';

function ShopPage() {
  // const [category, setCategory] = useState<string[]>([]);
  // const [brand, setBrand] = useState<string[]>([]);
  // const [search, setSearch] = useState('');

  // const [minPrice, setMinPrice] = useState<number>(1);
  // const [maxPrice, setMaxPrice] = useState<number>(1);

  const dispatch = useAppDispatch();
  const { categories, brands, searchQuery, minPrice, maxPrice } =
    useAppSelector((state) => state.searchSettings);

  const categoryHandler = (str: string, isChecked: boolean) => {
    if (isChecked) {
      // setCategory((state) => [...state, str]);
      dispatch(addCategory(str));
    } else {
      // setCategory((state) => state.filter((item) => item !== str));
      dispatch(removeCategory(str));
    }
  };

  const brandHandler = (str: string, isChecked: boolean) => {
    if (isChecked) {
      // setBrand((state) => [...state, str]);
      dispatch(addBrand(str));
    } else {
      // setBrand((state) => state.filter((item) => item !== str));
      dispatch(removeBrand(str));
    }
  };

  const searchHandler = (str: string) => {
    // setSearch(() => str.toLowerCase());
    dispatch(addSearchQuery(str.toLowerCase()));
  };

  useEffect(() => {
    dispatch(fetchPrices());
    // const service = new Service();
    // service
    //   .getMinMaxPrices()
    //   .then((arr) => {
    //     setMinPrice(arr[0]);
    //     setMaxPrice(arr[1]);
    //   })
    //   .catch();
  }, [dispatch]);

  const handleMinValue = (arg: number) => {
    // setMinPrice(arg);
    dispatch(setMinPrice(arg));
  };

  const handleMaxValue = (arg: number) => {
    // setMaxPrice(arg);
    dispatch(setMaxPrice(arg));
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
          brand={brands}
          category={categories}
          search={searchQuery}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </div>
  );
}

export default ShopPage;
