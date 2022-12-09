import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

// Config
import { partTypes } from "../../../config";

// Components
import Icon from "../../../components/Icon";

const PartHead = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort");
  const sortDirection = sort ? sort[0] : null;
  const sortColumn = sort ? sort.slice(1, sort.length) : null;

  const onClick = (prop) => {
    if (searchParams.has("sort")) {
      const sign = searchParams.get("sort")[0];
      if (sign === "+") {
        searchParams.set("sort", `-${prop}`);
      } else {
        searchParams.set("sort", `+${prop}`);
      }
    } else {
      searchParams.append("sort", `+${prop}`);
    }
    setSearchParams(searchParams);
  };

  return (
    <Row>
      <PartMetaHead
        sortDirection={sortDirection}
        sortColumn={sortColumn}
        onClick={onClick}
      />
      <PartSpecHead
        sortDirection={sortDirection}
        sortColumn={sortColumn}
        onClick={onClick}
      />
    </Row>
  );
};

const PartMetaHead = ({ sortDirection, sortColumn, onClick }) => {
  return (
    <>
      <Cell onClick={() => onClick("name")}>
        {sortColumn === "name" ? (
          sortDirection === "+" ? (
            <Icon icon="caret-down" />
          ) : (
            <Icon icon="caret-up" />
          )
        ) : null}
        Name
      </Cell>
      <Cell onClick={() => onClick("weight")}>
        {sortColumn === "weight" ? (
          sortDirection === "+" ? (
            <Icon icon="caret-down" />
          ) : (
            <Icon icon="caret-up" />
          )
        ) : null}
        Weight
      </Cell>
      <Cell onClick={() => onClick("currentPrice")}>
        {sortColumn === "currentPrice" ? (
          sortDirection === "+" ? (
            <Icon icon="caret-down" />
          ) : (
            <Icon icon="caret-up" />
          )
        ) : null}
        Price
      </Cell>
      <Cell onClick={() => onClick("ratingAverage")}>
        {sortColumn === "ratingAverage" ? (
          sortDirection === "+" ? (
            <Icon icon="caret-down" />
          ) : (
            <Icon icon="caret-up" />
          )
        ) : null}
        Rating
      </Cell>
    </>
  );
};

const PartSpecHead = ({ sortDirection, sortColumn, onClick }) => {
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
