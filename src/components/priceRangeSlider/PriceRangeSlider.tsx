import { useState, useEffect } from 'react';
import Service from '../../service/Service';
import './price.scss';

interface Props {
  handleMaxValue: (arg: number) => void;
  handleMinValue: (arg: number) => void;
}

export default function PriceRangeSlider(props: Props) {
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(1);
  const { handleMaxValue, handleMinValue } = props;
  useEffect(() => {
    const service = new Service();
    service
      .getMinMaxPrices()
      .then((arr) => {
        setMinValue(arr[0]);
        setMaxValue(arr[1]);
      })
      .catch();
  }, []);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleMinValue(Number(e.target.value));
    setMinValue(Number(e.target.value));
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleMaxValue(Number(e.target.value));
    setMaxValue(Number(e.target.value));
  };

  return (
    <div className="filters__item price">
      <h2 className="price__heading">Filter by price</h2>
      <div className="price__container">
        <input
          onChange={handleMin}
          value={minValue}
          type="text"
          className="price__input price__from"
        />
        <input
          onChange={handleMax}
          value={maxValue}
          type="text"
          className="price__input price__to"
        />
      </div>
    </div>
  );
}
