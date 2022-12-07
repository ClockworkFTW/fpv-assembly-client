import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

// Config
import { partTypes } from "../../../config";

const PartHead = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = (prop) => {
    console.log(prop);
  };

  return (
    <Row>
      <PartMetaHead onClick={onClick} />
      <PartSpecHead onClick={onClick} />
    </Row>
  );
};

const PartMetaHead = ({ onClick }) => {
  return (
    <>
      <Cell onClick={() => onClick("name")}>Name</Cell>
      <Cell onClick={() => onClick("weight")}>Weight</Cell>
      <Cell onClick={() => onClick("price")}>Price</Cell>
      <Cell onClick={() => onClick("rating")}>Rating</Cell>
    </>
  );
};

const PartSpecHead = ({ onClick }) => {
  const { partType } = useParams();

  switch (partType) {
    case partTypes.motor:
      return (
        <>
          <Cell onClick={() => onClick("kv")}>KV</Cell>
          <Cell onClick={() => onClick("motorDiameter")}>Motor Diameter</Cell>
          <Cell onClick={() => onClick("motorHeight")}>Motor Height</Cell>
          <Cell onClick={() => onClick("shaftDiameter")}>Shaft Diameter</Cell>
          <Cell onClick={() => onClick("motorMountWidth")}>
            Motor Mount Width
          </Cell>
          <Cell onClick={() => onClick("motorMountLength")}>
            Motor Mount Length
          </Cell>
        </>
      );
    case partTypes.frame:
      // TODO: Add cells
      return null;
    case partTypes.battery:
      // TODO: Add cells
      return null;
    case partTypes.radioReceiver:
      // TODO: Add cells
      return null;
    case partTypes.videoCamera:
      // TODO: Add cells
      return null;
    case partTypes.videoAntenna:
      // TODO: Add cells
      return null;
    case partTypes.videoTransmitter:
      // TODO: Add cells
      return null;
    case partTypes.flightController:
      // TODO: Add cells
      return null;
    case partTypes.electronicSpeedController:
      // TODO: Add cells
      return null;
    default:
      return null;
  }
};

const Row = styled.tr``;

const Cell = styled.td``;

export default PartHead;
