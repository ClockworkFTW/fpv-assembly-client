import { useParams } from "react-router-dom";

import { useGetPartsQuery } from "./partsApiSlice";
import { partTypes } from "../../config";

const PartDetails = () => {
  const { partId, partType } = useParams();

  const { part, status } = useGetPartsQuery(undefined, {
    selectFromResult: ({ data, status }) => ({
      part: data?.entities[partId],
      status,
    }),
  });

  const renderSpecs = (part) => {
    switch (part.type) {
      case partTypes.motor:
        return (
          <ul>
            <li>Weight: {part.weight}</li>
            <li>KV: {part.kv}</li>
            <li>Motor Diameter: {part.motorDiameter}</li>
            <li>Motor Height: {part.motorHeight}</li>
            <li>Shaft Diameter: {part.shaftDiameter}</li>
            <li>Motor Mount Width: {part.motorMountWidth}</li>
            <li>Motor Mount Length: {part.motorMountLength}</li>
          </ul>
        );
      case partTypes.frame:
        return (
          <ul>
            <li>Weight: {part.weight}</li>
          </ul>
        );
      case partTypes.battery:
        return (
          <ul>
            <li>Weight: {part.weight}</li>
          </ul>
        );
      case partTypes.propeller:
        return (
          <ul>
            <li>Weight: {part.weight}</li>
          </ul>
        );
      case partTypes.radioReceiver:
        return (
          <ul>
            <li>Weight: {part.weight}</li>
          </ul>
        );
      case partTypes.videoCamera:
        return (
          <ul>
            <li>Weight: {part.weight}</li>
          </ul>
        );
      case partTypes.videoAntenna:
        return (
          <ul>
            <li>Weight: {part.weight}</li>
          </ul>
        );
      case partTypes.videoTransmitter:
        return (
          <ul>
            <li>Weight: {part.weight}</li>
          </ul>
        );
      case partTypes.flightController:
        return (
          <ul>
            <li>Weight: {part.weight}</li>
          </ul>
        );
      case partTypes.electronicSpeedController:
        return (
          <ul>
            <li>Weight: {part.weight}</li>
          </ul>
        );
      default:
        break;
    }
  };

  return status !== "fulfilled" ? (
    <p>Loading...</p>
  ) : part && part.type === partType ? (
    <div>
      <h1>{part.name}</h1>
      <img src={part.image} alt={`${part.type}`} />
      {renderSpecs(part)}
    </div>
  ) : (
    <p>Part not found...</p>
  );
};

export default PartDetails;
