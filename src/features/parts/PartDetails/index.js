import { useParams, useNavigate } from "react-router-dom";

import useAuth from "../../auth/useAuth";
import { useGetPartsQuery } from "../partsApiSlice";
import { partTypes, userRoles } from "../../../config";

import PriceChart from "./PriceChart";

const PartDetails = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const { partId, partType } = useParams();

  const { part, status } = useGetPartsQuery(undefined, {
    selectFromResult: ({ data, status }) => ({
      part: data?.entities[partId],
      status,
    }),
  });

  const renderEditButton = (partId) => {
    if (user?.role === userRoles.admin) {
      const onClick = () => navigate(`/parts/edit/${partId}`);
      return <button onClick={onClick}>edit</button>;
    }
  };

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

  const renderListings = (listings) => (
    <ul>
      {listings.map((listing, i) => {
        const latestPrice = listing.prices[listing.prices.length - 1].value;
        return (
          <li key={i}>
            {listing.vendor} - ${latestPrice}
          </li>
        );
      })}
    </ul>
  );

  return status !== "fulfilled" ? (
    <p>Loading...</p>
  ) : part && part.type === partType ? (
    <div>
      {renderEditButton(part.id)}
      <h1>{part.name}</h1>
      <img src={part.image} alt={`${part.type}`} />
      {renderSpecs(part)}
      {renderListings(part.listings)}
      <PriceChart listings={part.listings} />
    </div>
  ) : (
    <p>Part not found...</p>
  );
};

export default PartDetails;
