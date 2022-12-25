import { useParams } from "react-router-dom";

// Config
import { partMeta, partTypes } from "config";

// Components
import TagsFilter from "features/parts/PartsFilter/TagsFilter";
import RangeFilter from "features/parts/PartsFilter/RangeFilter";

const PartsFilter = ({ filter }) => (
  <div>
    <PartsMetaFilter filter={filter} />
    <PartsSpecFilter filter={filter} />
  </div>
);

const PartsMetaFilter = ({ filter }) => (
  <>
    <RangeFilter
      key={"1" + JSON.stringify(filter.weight)}
      prop={partMeta.weight.prop}
      label={partMeta.weight.label}
      unit={partMeta.weight.unit}
      min={filter.weight.minLimit}
      max={filter.weight.maxLimit}
      initialValue={[filter.weight.minValue, filter.weight.maxValue]}
    />
    <RangeFilter
      key={"2" + JSON.stringify(filter.currentPrice)}
      prop={partMeta.currentPrice.prop}
      label={partMeta.currentPrice.label}
      unit={partMeta.currentPrice.unit}
      step={0.01}
      min={filter.currentPrice.minLimit}
      max={filter.currentPrice.maxLimit}
      initialValue={[
        filter.currentPrice.minValue,
        filter.currentPrice.maxValue,
      ]}
    />
    <TagsFilter
      key={"3" + JSON.stringify(filter.manufacturer)}
      prop={partMeta.manufacturer.prop}
      label={partMeta.manufacturer.label}
      initialValue={filter.manufacturer}
    />
  </>
);

const PartsSpecFilter = ({ filter }) => {
  const { partType } = useParams();
  switch (partType) {
    case "motor": {
      const config = partTypes["motor"];
      return (
        <>
          <RangeFilter
            key={"4" + JSON.stringify(filter.kv)}
            prop={config.kv.prop}
            label={config.kv.label}
            unit={config.kv.unit}
            min={filter.kv.minLimit}
            max={filter.kv.maxLimit}
            initialValue={[filter.kv.minValue, filter.kv.maxValue]}
          />
          <RangeFilter
            key={"5" + JSON.stringify(filter.motorDiameter)}
            prop={config.motorDiameter.prop}
            label={config.motorDiameter.label}
            unit={config.motorDiameter.unit}
            min={filter.motorDiameter.minLimit}
            max={filter.motorDiameter.maxLimit}
            initialValue={[
              filter.motorDiameter.minValue,
              filter.motorDiameter.maxValue,
            ]}
          />
          <RangeFilter
            key={"6" + JSON.stringify(filter.motorHeight)}
            prop={config.motorHeight.prop}
            label={config.motorHeight.label}
            unit={config.motorHeight.unit}
            min={filter.motorHeight.minLimit}
            max={filter.motorHeight.maxLimit}
            initialValue={[
              filter.motorHeight.minValue,
              filter.motorHeight.maxValue,
            ]}
          />
          <RangeFilter
            key={"7" + JSON.stringify(filter.shaftDiameter)}
            prop={config.shaftDiameter.prop}
            label={config.shaftDiameter.label}
            unit={config.shaftDiameter.unit}
            min={filter.shaftDiameter.minLimit}
            max={filter.shaftDiameter.maxLimit}
            initialValue={[
              filter.shaftDiameter.minValue,
              filter.shaftDiameter.maxValue,
            ]}
          />
          <RangeFilter
            key={"8" + JSON.stringify(filter.motorMountWidth)}
            prop={config.motorMountWidth.prop}
            label={config.motorMountWidth.label}
            unit={config.motorMountWidth.unit}
            min={filter.motorMountWidth.minLimit}
            max={filter.motorMountWidth.maxLimit}
            initialValue={[
              filter.motorMountWidth.minValue,
              filter.motorMountWidth.maxValue,
            ]}
          />
          <RangeFilter
            key={"9" + JSON.stringify(filter.motorMountLength)}
            prop={config.motorMountLength.prop}
            label={config.motorMountLength.label}
            unit={config.motorMountLength.unit}
            min={filter.motorMountLength.minLimit}
            max={filter.motorMountLength.maxLimit}
            initialValue={[
              filter.motorMountLength.minValue,
              filter.motorMountLength.maxValue,
            ]}
          />
        </>
      );
    }
    case "frame": {
      // TODO: Add filters
      const config = partTypes["frame"];
      return null;
    }
    case "battery": {
      // TODO: Add filters
      const config = partTypes["battery"];
      return null;
    }
    case "radio-receiver": {
      // TODO: Add filters
      const config = partTypes["radio-receiver"];
      return null;
    }
    case "video-camera": {
      // TODO: Add filters
      const config = partTypes["video-camera"];
      return null;
    }
    case "video-antenna": {
      // TODO: Add filters
      const config = partTypes["video-antenna"];
      return null;
    }
    case "video-transmitter": {
      // TODO: Add filters
      const config = partTypes["video-transmitter"];
      return null;
    }
    case "flight-controller": {
      // TODO: Add filters
      const config = partTypes["flight-controller"];
      return null;
    }
    case "electronic-speed-controller": {
      // TODO: Add filters
      const config = partTypes["electronic-speed-controller"];
      return null;
    }
    default:
      return null;
  }
};

export default PartsFilter;
