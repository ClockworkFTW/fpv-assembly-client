import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Range = ({ min, max, defaultValue, onAfterChange }) => {
  const [value, setValue] = useState([min, max]);

  const onChange = (range) => {
    setValue(range);
  };

  return (
    <Slider
      range
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      onAfterChange={onAfterChange}
      defaultValue={defaultValue}
      allowCross={false}
    />
  );
};

export default Range;
