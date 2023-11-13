import { useState, useEffect } from 'react';
import Service from '../../service/Service';
import SkeletonBrand from '../skeletons/SkeletonBrand';
import './brand.scss';

interface Props {
  brandHandler: (i: string, b: boolean) => void;
}

function Brand(props: Props) {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);

  const shopService = new Service();

  const onBrandsLoaded = (items: string[]) => {
    setBrands(() => [...items]);
    setLoading(() => false);
  };

  const onRequest = () => {
    shopService.getAllBrands().then(onBrandsLoaded).catch();
  };

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { brandHandler } = props;

  const renderBrands = (arr: string[]) => {
    const items = arr.map((item, i) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={i} className="brand__wrapper">
          <input
            onClick={(e) => {
              const target = e.target as HTMLInputElement;
              brandHandler(item, target.checked);
            }}
            id={item}
            type="checkbox"
            className="brand__option"
          />
          <label htmlFor={item} className="brand__label">
            {item}
          </label>
        </li>
      );
    });

    return <ul className="brand__list">{items}</ul>;
  };

  const items = renderBrands(brands);
  const skeleton = loading ? <SkeletonBrand /> : null;

  return (
    <div className="brand filters__item">
      <h2 className="brand__heading">Brand</h2>
      {items}
      {skeleton}
    </div>
  );
}

export default Brand;
