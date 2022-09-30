import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { setRange } from "./partsFilterSlice";
import { getSearchParams } from "../../../util";

const Range = Slider.createSliderWithTooltip(Slider.Range);

const RangeFilter = ({ prop, unit = "", min, max, initialValue }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(initialValue);

  const onChange = (range) => {
    setValue(range);
  };

  const [params, setParams] = useSearchParams();

  const onAfterChange = ([minValue, maxValue]) => {
    dispatch(setRange({ prop, minValue, maxValue }));

    let { [prop]: x, ...newParams } = getSearchParams(params);

    if (minValue !== min || maxValue !== max) {
      newParams = {
        ...getSearchParams(params),
        [prop]: `${minValue}_${maxValue}`,
      };
    }

    setParams(newParams);
  };

  const tipFormatter = (value) => `${value}${unit}`;

  return (
    <div>
      <label>{prop}</label>
      <Range
        min={min}
        max={max}
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
