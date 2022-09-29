import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import TagsFilter from "./TagsFilter";
import RangeFilter from "./RangeFilter";

import { partTypes } from "../../../config";

const PartsFilter = () => {
  const { partType } = useParams();
  const partsFilter = useSelector((state) => state.partsFilter);

  const renderFilters = () => {
    if (!partsFilter) return null;

    const { manufacturer, weight } = partsFilter;

    switch (partType) {
      case partTypes.motor:
        const { kv, motorDiameter, motorHeight, shaftDiameter } = partsFilter;

        return (
          <div>
            <TagsFilter prop="manufacturer" tags={manufacturer} />
            <RangeFilter
              prop="weight"
              unit="g"
              min={weight.minLimit}
              max={weight.maxLimit}
              initialValue={[weight.minValue, weight.maxValue]}
            />
            <RangeFilter
              prop="kv"
              unit="kv"
              min={kv.minLimit}
              max={kv.maxLimit}
              initialValue={[kv.minValue, kv.maxValue]}
            />
            <RangeFilter
              prop="motorDiameter"
              unit="mm"
              min={motorDiameter.minLimit}
              max={motorDiameter.maxLimit}
              initialValue={[motorDiameter.minValue, motorDiameter.maxValue]}
            />
            <RangeFilter
              prop="motorHeight"
              unit="mm"
              min={motorHeight.minLimit}
              max={motorHeight.maxLimit}
              initialValue={[motorHeight.minValue, motorHeight.maxValue]}
            />
            <RangeFilter
              prop="shaftDiameter"
              unit="mm"
              min={shaftDiameter.minLimit}
              max={shaftDiameter.maxLimit}
              initialValue={[shaftDiameter.minValue, shaftDiameter.maxValue]}
            />
          </div>
        );
      case partTypes.frame:
        // TODO: Add filters
        return null;
      case partTypes.battery:
        // TODO: Add filters
        return null;
      case partTypes.radioReceiver:
        // TODO: Add filters
        return null;
      case partTypes.videoCamera:
        // TODO: Add filters
        return null;
      case partTypes.videoAntenna:
        // TODO: Add filters
        return null;
      case partTypes.videoTransmitter:
        // TODO: Add filters
        return null;
      case partTypes.flightController:
        // TODO: Add filters
        return null;
      case partTypes.electronicSpeedController:
        // TODO: Add filters
        return null;
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
