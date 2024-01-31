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
import './shop.scss';
import './filters.scss';

function ShopPage() {
  const dispatch = useAppDispatch();
  const { categories, brands, searchQuery, minPrice, maxPrice } =
    useAppSelector((state) => state.searchSettings);

  const categoryHandler = (str: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addCategory(str));
    } else {
      dispatch(removeCategory(str));
    }
  };

  const brandHandler = (str: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addBrand(str));
    } else {
      dispatch(removeBrand(str));
    }
  };

  const searchHandler = (str: string) => {
    dispatch(addSearchQuery(str.toLowerCase()));
  };

  useEffect(() => {
    dispatch(fetchPrices());
  }, [dispatch]);

  const handleMinValue = (arg: number) => {
    dispatch(setMinPrice(arg));
  };

  const handleMaxValue = (arg: number) => {
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
