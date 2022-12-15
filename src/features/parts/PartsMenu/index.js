import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Config
import { partTypes } from "../../../config";

// Components
import Icon from "../../../components/Icon";

// Utilities
import { partTypeToName } from "../../../util";

const PartsMenu = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onLinkClicked = (queryParam) => {
    setIsVisible(false);
    navigate(`/parts/${queryParam}?page=1`);
  };

  const renderMenu = () =>
    isVisible && (
      <Wrapper>
        <Container items={Object.keys(partTypes).length}>
          {Object.entries(partTypes).map(([partType]) => (
            <Item key={partType} onClick={() => onLinkClicked(partType)}>
              {partTypeToName(partType, true)}
            </Item>
          ))}
        </Container>
      </Wrapper>
    );

  return (
    <>
      <Link onClick={toggleVisibility}>
        Parts
        <Icon icon={["far", isVisible ? "angle-up" : "angle-down"]} ml="6px" />
      </Link>
      {renderMenu()}
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: grey;
`;

const Container = styled.div`
  max-width: 96%;
  margin: 0 auto;
  padding: 10px 0;
  display: grid;
  row-gap: 10px;
  column-gap: 10px;
  grid-template-columns: ${({ items }) => `repeat(${items / 2}, 1fr)`};
`;

const Item = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const Link = styled.a`
  :hover {
    cursor: pointer;
  }
`;

export default PartsMenu;
