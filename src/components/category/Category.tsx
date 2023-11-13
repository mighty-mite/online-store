import { useState, useEffect } from 'react';
import '../../commonStyles/global.scss';
import './category.scss';

import Service from '../../service/Service';
import Skeleton from '../skeletons/SkeletonFilter';

interface Props {
  categoryHandler: (i: string, b: boolean) => void;
}

function Category(props: Props) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const service = new Service();

  const onCategoriesLoaded = (items: string[]) => {
    setCategories(() => [...items]);
    setLoading(() => false);
  };

  const onRequest = () => {
    service.getAllCategories().then(onCategoriesLoaded).catch();
  };

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { categoryHandler } = props;

  const renderCategories = (arr: string[]) => {
    const items = arr.map((item, i) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={i} className="category__item">
          <input
            onClick={(e) => {
              const target = e.target as HTMLInputElement;
              categoryHandler(item, target.checked);
            }}
            id={item}
            type="checkbox"
            className="category__option"
          />
          <label className="category__label" htmlFor={item}>
            {item}
          </label>
        </li>
      );
    });

    return <ul className="category__list">{items}</ul>;
  };

  const items = renderCategories(categories);
  const skeleton = loading ? <Skeleton /> : null;

  return (
    <div className="category filters__item">
      <h2 className="category__heading">Category</h2>
      {items}
      {skeleton}
    </div>
  );
}

export default Category;
