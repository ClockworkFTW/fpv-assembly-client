import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Range = Slider.createSliderWithTooltip(Slider.Range);

const RangeFilter = (props) => {
  const { prop, label, unit = "", step = 1, min, max, initialValue } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(initialValue);

  const onChange = (range) => {
    setValue(range);
  };

  const onAfterChange = ([minValue, maxValue]) => {
    if (minValue !== min || maxValue !== max) {
      if (searchParams.has(prop)) {
        searchParams.set(prop, `{"min":${minValue},"max":${maxValue}}`);
      } else {
        searchParams.append(prop, `{"min":${minValue},"max":${maxValue}}`);
      }
    } else {
      searchParams.delete(prop);
    }
    setSearchParams(searchParams);
  };

  const tipFormatter = (value) => `${value}${unit}`;

  return (
    <div>
      <label>{label}</label>
      <Range
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        onAfterChange={onAfterChange}
        tipFormatter={tipFormatter}
        allowCross={false}
      />
    </div>
  );
};

export default RangeFilter;
