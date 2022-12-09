import { useParams } from "react-router-dom";

// Config
import { partTypes } from "../../../config";

// Components
import TagsFilter from "./TagsFilter";
import RangeFilter from "./RangeFilter";

const PartsFilter = ({ filter }) => (
  <div>
    <PartsMetaFilter filter={filter} />
    <PartsSpecFilter filter={filter} />
  </div>
);

const PartsMetaFilter = ({ filter }) => {
  const { currentPrice, manufacturer, weight } = filter;

  return (
    <>
      <RangeFilter
        key={JSON.stringify(weight)}
        prop="weight"
        label="Weight"
        unit="g"
        min={weight.minLimit}
        max={weight.maxLimit}
        initialValue={[weight.minValue, weight.maxValue]}
      />
      <RangeFilter
        key={JSON.stringify(currentPrice)}
        prop="currentPrice"
        label="Price"
        unit="$"
        step={0.01}
        min={currentPrice.minLimit}
        max={currentPrice.maxLimit}
        initialValue={[currentPrice.minValue, currentPrice.maxValue]}
      />
      <TagsFilter
        key={JSON.stringify(manufacturer)}
        name="manufacturer"
        initialValue={manufacturer}
      />
    </>
  );
};

const PartsSpecFilter = ({ filter }) => {
  const { partType } = useParams();

  switch (partType) {
    case partTypes.motor:
      const { kv, motorDiameter, motorHeight, shaftDiameter } = filter;

      return (
        <>
          <RangeFilter
            key={JSON.stringify(kv)}
            prop="kv"
            name="KV"
            unit="kv"
            min={kv.minLimit}
            max={kv.maxLimit}
            initialValue={[kv.minValue, kv.maxValue]}
          />
          <RangeFilter
            key={JSON.stringify(motorDiameter)}
            prop="motorDiameter"
            label="Motor Diameter"
            unit="mm"
            min={motorDiameter.minLimit}
            max={motorDiameter.maxLimit}
            initialValue={[motorDiameter.minValue, motorDiameter.maxValue]}
          />
          <RangeFilter
            key={JSON.stringify(motorHeight)}
            prop="motorHeight"
            label="Motor Height"
            unit="mm"
            min={motorHeight.minLimit}
            max={motorHeight.maxLimit}
            initialValue={[motorHeight.minValue, motorHeight.maxValue]}
          />
          <RangeFilter
            key={JSON.stringify(shaftDiameter)}
            prop="shaftDiameter"
            label="Shaft Diameter"
            unit="mm"
            min={shaftDiameter.minLimit}
            max={shaftDiameter.maxLimit}
            initialValue={[shaftDiameter.minValue, shaftDiameter.maxValue]}
          />
        </>
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

export default PartsFilter;
