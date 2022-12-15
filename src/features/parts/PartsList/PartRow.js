import { memo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

// API
import { useGetPartsQuery } from "../partsApiSlice";
import { useCreateBuildPartMutation } from "../../builds/buildsApiSlice";

// Config
import { partTypes } from "../../../config";

// Components
import Rating from "../../../components/Rating";

// Hooks
import useActiveBuildId from "../../../hooks/useActiveBuildId";

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
      <PartNameRow partMeta={partMeta} />
      <PartSpecRow partSpec={partSpec} />
      <PartMetaRow partMeta={partMeta} partId={partId} />
    </Row>
  );
};

const PartNameRow = ({ partMeta }) => (
  <>
    <Cell style={{ minWidth: "300px", maxWidth: "300px" }}>
      <Group>
        <Image src={partMeta.image} />
        <Name to={`/parts/${partMeta.type}/${partMeta.id}`}>
          {partMeta.name}
        </Name>
      </Group>
    </Cell>
  </>
);

const PartMetaRow = ({ partMeta, partId }) => {
  const { partType } = useParams();
  const config = partTypes[partType];

  const buildId = useActiveBuildId();

  const [createBuildPart] = useCreateBuildPartMutation();

  return (
    <>
      <Cell>
        {partMeta.weight}
        {config.weight.unit}
      </Cell>
      <Cell>
        <Group>
          <Rating rating={partMeta.ratingAverage} /> ({partMeta.ratingCount})
        </Group>
      </Cell>
      <Cell>
        {config.currentPrice.unit}
        {partMeta.currentPrice}{" "}
        {buildId && (
          <button onClick={() => createBuildPart({ buildId, partId })}>
            add
          </button>
        )}
      </Cell>
    </>
  );
};

const PartSpecRow = ({ partSpec }) => {
  const { partType } = useParams();

  switch (partType) {
    case "motor": {
      const config = partTypes[partType];
      return (
        <>
          <Cell>
            {partSpec.kv}
            {config.kv.unit}
          </Cell>
          <Cell>
            {partSpec.motorDiameter}
            {config.motorDiameter.unit}
          </Cell>
          <Cell>
            {partSpec.motorHeight}
            {config.motorHeight.unit}
          </Cell>
          <Cell>
            {partSpec.shaftDiameter}
            {config.shaftDiameter.unit}
          </Cell>
          <Cell>
            {partSpec.motorMountWidth}
            {config.motorMountWidth.unit}
          </Cell>
          <Cell>
            {partSpec.motorMountLength}
            {config.motorMountLength.unit}
          </Cell>
        </>
      );
    }

    case "frame":
      // TODO: Add cells
      return null;
    case "battery":
      // TODO: Add cells
      return null;
    case "radio-receiver":
      // TODO: Add cells
      return null;
    case "video-camera":
      // TODO: Add cells
      return null;
    case "video-antenna":
      // TODO: Add cells
      return null;
    case "video-transmitter":
      // TODO: Add cells
      return null;
    case "flight-controller":
      // TODO: Add cells
      return null;
    case "electronic-speed-controller":
      // TODO: Add cells
      return null;
    default:
      return null;
  }
};

const Row = styled.tr``;

const Cell = styled.td`
  padding: 4px 8px;
  border-top: 1px solid silver;
  font-size: 14px;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled(Link)`
  font-weight: 700;
`;

const Image = styled.img`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export default memo(PartRow);
