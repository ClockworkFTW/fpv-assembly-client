import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

// Config
import { partTypes } from "config";

// Components
import Icon from "components/Icon";

const PartsTableHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort");
  const sortDirection = sort ? sort[0] : null;
  const sortColumn = sort ? sort.slice(1, sort.length) : null;

  const setSortProp = (prop) => {
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
    <thead>
      <tr>
        <PartNameHead
          sortDirection={sortDirection}
          sortColumn={sortColumn}
          setSortProp={setSortProp}
        />
        <PartSpecHead
          sortDirection={sortDirection}
          sortColumn={sortColumn}
          setSortProp={setSortProp}
        />
        <PartMetaHead
          sortDirection={sortDirection}
          sortColumn={sortColumn}
          setSortProp={setSortProp}
        />
      </tr>
    </thead>
  );
};

const PartNameHead = (props) => {
  return (
    <>
      <Cell prop="name" label="Name" {...props} />
    </>
  );
};

const PartMetaHead = (props) => {
  return (
    <>
      <Cell prop="weight" label="Weight" {...props} />
      <Cell prop="ratingAverage" label="Rating" {...props} />
      <Cell prop="currentPrice" label="Price" {...props} />
    </>
  );
};

const PartSpecHead = (props) => {
  const { partType } = useParams();

  switch (partType) {
    case "motor": {
      const config = partTypes[partType];
      return (
        <>
          <Cell prop={config.kv.prop} label={config.kv.label} {...props} />
          <Cell
            prop={config.motorDiameter.prop}
            label={config.motorDiameter.label}
            {...props}
          />
          <Cell
            prop={config.motorHeight.prop}
            label={config.motorHeight.label}
            {...props}
          />
          <Cell
            prop={config.shaftDiameter.prop}
            label={config.shaftDiameter.label}
            {...props}
          />
          <Cell
            prop={config.motorMountWidth.prop}
            label={config.motorMountWidth.label}
            {...props}
          />
          <Cell
            prop={config.motorMountLength.prop}
            label={config.motorMountLength.label}
            {...props}
          />
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

const Cell = ({ prop, label, sortDirection, sortColumn, setSortProp }) => (
  <Wrapper onClick={() => setSortProp(prop)}>
    <Content>
      <SortIcon
        prop={prop}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
      {label}
    </Content>
  </Wrapper>
);

const SortIcon = ({ prop, sortColumn, sortDirection }) => {
  if (sortColumn === prop) {
    if (sortDirection === "+") {
      return <Icon icon={["far", "caret-down"]} mr="6px" />;
    }
    if (sortDirection === "-") {
      return <Icon icon={["far", "caret-up"]} mr="6px" />;
    }
  }
};

const Wrapper = styled.th`
  text-align: left;
  padding: 4px 8px;
  border-bottom: 1px solid grey;
  :hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
`;

export default PartsTableHeader;
