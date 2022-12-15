import { useParams, useNavigate } from "react-router-dom";

// API
import { useGetPartQuery } from "../partsApiSlice";

// Components
import PriceChart from "./PriceChart";

// Config
import { partTypes, userRoles } from "../../../config";

// Hooks
import useAuth from "../../../hooks/useAuth";

const PartDetails = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const { partId, partType } = useParams();

  const { data: part, isLoading } = useGetPartQuery(partId);

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
      {listings.map((listing, i) => (
        <li key={i}>
          {listing.vendor} - $
          {listing.priceHistory[listing.priceHistory.length - 1].value}
        </li>
      ))}
    </ul>
  );

  return isLoading ? (
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
