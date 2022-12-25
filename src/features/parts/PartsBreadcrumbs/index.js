import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

// Config
import { partTypes } from "config";

const PartsBreadcrumbs = ({ filter }) => {
  const { partType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (key) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  return (
    <Container>
      {Object.entries(filter).map(([key, settings]) => {
        const test = partTypes[partType][key];

        if (!test) return null;

        switch (test.filter) {
          case "range":
            return (
              <RangeBreadcrumb
                key={key}
                prop={test.prop}
                label={test.label}
                unit={test.unit}
                settings={settings}
                handleClick={handleClick}
              />
            );
          case "tags":
            return (
              <TagsBreadcrumb
                key={key}
                prop={test.prop}
                label={test.label}
                settings={settings}
                handleClick={handleClick}
              />
            );
          default:
            return null;
        }
      })}
    </Container>
  );
};

const RangeBreadcrumb = ({ prop, label, unit, settings, handleClick }) => {
  const isActive =
    settings.minValue !== settings.minLimit ||
    settings.maxValue !== settings.maxLimit;

  return isActive ? (
    <Item onClick={() => handleClick(prop)}>
      {`${label}: ${settings.minValue}${unit} - ${settings.maxValue}${unit}`}
    </Item>
  ) : null;
};

const TagsBreadcrumb = ({ prop, label, settings, handleClick }) => {
  const content = Object.entries(settings).reduce(
    (content, [tag, isChecked]) => {
      if (tag !== "All" && isChecked) {
        return content === "" ? tag : `${content}, ${tag}`;
      } else {
        return content;
      }
    },
    ""
  );

  return !settings["All"] ? (
    <Item onClick={() => handleClick(prop)}>
      {label}: {content}
    </Item>
  ) : null;
};

const Container = styled.div``;

const Item = styled.div`
  display: inline-block;
  margin: 0 10px 10px 0;
  padding: 6px 12px;
  border-radius: 4px;
  background-color: silver;
  :hover {
    cursor: pointer;
  }
`;

export default PartsBreadcrumbs;
