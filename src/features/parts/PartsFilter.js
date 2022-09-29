import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Range from "../../components/Range";

import { setRange } from "./partsFilterSlice";

const PartsFilter = () => {
  const dispatch = useDispatch();

  const { partType } = useParams();
  const partsFilter = useSelector((state) => state.partsFilter);

  const renderFilters = () => {
    if (!partsFilter) return null;

    switch (partType) {
      case "motor":
        return (
          <Range
            min={partsFilter.weight.minLimit}
            max={partsFilter.weight.maxLimit}
            defaultValue={[
              partsFilter.weight.minValue,
              partsFilter.weight.maxValue,
            ]}
            onAfterChange={([minValue, maxValue]) => {
              console.log(minValue, maxValue);
              dispatch(setRange({ prop: "weight", minValue, maxValue }));
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h3>Filters</h3>
      {renderFilters()}
    </div>
  );
};

export default PartsFilter;
