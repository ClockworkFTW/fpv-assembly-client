import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPartsQuery } from "../partsApiSlice";

import { partTypes } from "../../../config";
import { partTypeToName } from "../../../util";

import Part from "./Part";

const PartsList = () => {
  const { partType } = useParams();

  const partName = partTypeToName(partType, true);

  const {
    data: parts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPartsQuery(partType, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const partsFilter = useSelector((state) => state.partsFilter);

  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isSuccess && partsFilter) {
    const partIds = parts.ids.filter((id) => {
      const part = parts.entities[id];

      if (!part) return false;

      const { manufacturer, weight } = partsFilter;

      switch (partType) {
        case partTypes.motor:
          const { kv, motorDiameter, motorHeight, shaftDiameter } = partsFilter;

          return (
            (manufacturer.All || manufacturer[part.manufacturer]) &&
            part.weight >= weight.minValue &&
            part.weight <= weight.maxValue &&
            part.kv >= kv.minValue &&
            part.kv <= kv.maxValue &&
            part.motorDiameter >= motorDiameter.minValue &&
            part.motorDiameter <= motorDiameter.maxValue &&
            part.motorHeight >= motorHeight.minValue &&
            part.motorHeight <= motorHeight.maxValue &&
            part.shaftDiameter >= shaftDiameter.minValue &&
            part.shaftDiameter <= shaftDiameter.maxValue
          );
        default:
          return false;
      }
    });

    content = partIds.map((partId) => (
      <Part key={partId} partId={partId} partType={partType} />
    ));
  }

  if (isError) {
    content = <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>{partName}</h1>
      {content}
    </div>
  );
};

export default PartsList;
