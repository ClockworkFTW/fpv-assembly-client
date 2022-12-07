import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const PartsBreadcrumbs = ({ filter }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (key) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  return (
    <Container>
      {Object.entries(filter).map(([key, val]) =>
        "minLimit" in val && "maxLimit" in val ? (
          <RangeBreadcrumb
            key={key}
            label={key}
            config={val}
            handleClick={handleClick}
          />
        ) : (
          <TagsBreadcrumb
            key={key}
            label={key}
            config={val}
            handleClick={handleClick}
          />
        )
      )}
    </Container>
  );
};

const RangeBreadcrumb = ({ label, config, handleClick }) => {
  const isActive =
    config.minValue !== config.minLimit || config.maxValue !== config.maxLimit;

  return isActive ? (
    <Item onClick={() => handleClick(label)}>
      {label}: {config.minValue} - {config.maxValue}
    </Item>
  ) : null;
};

const TagsBreadcrumb = ({ label, config, handleClick }) => {
  const content = Object.entries(config).reduce((content, [tag, isChecked]) => {
    if (tag !== "All" && isChecked) {
      return content === "" ? tag : `${content}, ${tag}`;
    } else {
      return content;
    }
  }, "");

  return !config["All"] ? (
    <Item onClick={() => handleClick(label)}>
      {label}: {content}
    </Item>
  ) : null;
};

const Container = styled.div``;

const Item = styled.div`
  display: inline-block;
  margin: 0 10px 10px 0;
  padding: 6px 12px;
  background-color: grey;
  :hover {
    cursor: pointer;
  }
`;

export default PartsBreadcrumbs;
