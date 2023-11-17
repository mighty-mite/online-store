import { useState } from 'react';
import './price.scss';
import Slider from '@mui/material/Slider';

interface Props {
  priceHandler: (arr: number[]) => void;
}

export default function PriceRangeSlider(props: Props) {
  const [value, setValue] = useState<number[]>([20, 3000]);
  const { priceHandler } = props;

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    priceHandler(value);
  };

  return (
    <div className="filters__item price">
      <h2 className="price__heading">Filter by price</h2>
      <Slider
        min={20}
        max={1000}
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
