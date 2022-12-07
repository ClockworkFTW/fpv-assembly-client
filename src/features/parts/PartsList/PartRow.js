import { memo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

// API
import { useGetPartsQuery } from "../partsApiSlice";

// Config
import { partTypes } from "../../../config";

const PartRow = ({ partId }) => {
  const { partType } = useParams();
  const [searchParams] = useSearchParams();

  const partsQuery = `type=${partType}&${searchParams.toString()}`;

  const { part } = useGetPartsQuery(partsQuery, {
    selectFromResult: ({ data }) => ({
      part: data.parts.entities[partId],
    }),
  });

  if (!part) return null;

  const { [partType]: partSpec, ...partMeta } = part;

  return (
    <Row>
      <PartMetaRow partMeta={partMeta} />
      <PartSpecRow partSpec={partSpec} />
    </Row>
  );
};

const PartMetaRow = ({ partMeta }) => (
  <>
    <Cell>
      <Group>
        <Image src={partMeta.image} />
        <Name to={`/parts/${partMeta.type}/${partMeta.id}`}>
          {partMeta.name}
        </Name>
      </Group>
    </Cell>
    <Cell>{partMeta.weight}g</Cell>
    <Cell>${partMeta.currentPrice}</Cell>
    <Cell>
      {partMeta.ratingAverage} ({partMeta.ratingCount})
    </Cell>
  </>
);

const PartSpecRow = ({ partSpec }) => {
  const { partType } = useParams();

  switch (partType) {
    case partTypes.motor:
      return (
        <>
          <Cell>{partSpec.kv}</Cell>
          <Cell>{partSpec.motorDiameter}</Cell>
          <Cell>{partSpec.motorHeight}</Cell>
          <Cell>{partSpec.shaftDiameter}</Cell>
          <Cell>{partSpec.motorMountWidth}</Cell>
          <Cell>{partSpec.motorMountLength}</Cell>
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

const Row = styled.tr`
  border-top: 1px solid grey;
`;

const Cell = styled.td``;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  color: black;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export default memo(PartRow);
