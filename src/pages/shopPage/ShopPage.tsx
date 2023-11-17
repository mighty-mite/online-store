import { useState } from 'react';
import Brand from '../../components/brand/Brand';
import Searchbar from '../../components/searchbar/Searchbar';
import Category from '../../components/category/Category';
import PriceRangeSlider from '../../components/priceRangeSlider/PriceRangeSlider';
import './shop.scss';
import './filters.scss';
import Goods from '../../components/goods/Goods';

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

  const priceHandler = (arr: number[]) => {
    setPrice(arr);
  };

  const getMinMaxPrice = (arr: Product[]) => {
    const prices = new Set<number>();
    arr.forEach((item) => {
      prices.add(item.price);
    });
    return [Math.min(...prices), Math.max(...prices)];
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
