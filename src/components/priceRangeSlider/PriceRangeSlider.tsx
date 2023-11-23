import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Service from '../../service/Service';
import './price.scss';

interface Props {
  priceHandler: (arr: number[]) => void;
}

export default function PriceRangeSlider(props: Props) {
  const [value, setValue] = useState<number[]>([]);
  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();
  const { priceHandler } = props;

  useEffect(() => {
    const service = new Service();
    service
      .getMinMaxPrices()
      .then((arr) => {
        setValue(arr);
        setMinValue(arr[0]);
        setMaxValue(arr[1]);
      })
      .catch();
  }, []);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    priceHandler(value);
  };

  return (
    <div className="filters__item price">
      <h2 className="price__heading">Filter by price</h2>
      <Slider
        min={minValue}
        max={maxValue}
        classes={{}}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
      <div className="price__container">
        <input
          readOnly
          value={`${value[0]}$`}
          type="text"
          className="price__input price__from"
        />
        <input
          readOnly
          value={`${value[1]}$`}
          type="text"
          className="price__input price__to"
        />
      </div>
    </div>
  );
}
