import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
`;

export const Item = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 4px;
  overflow: hidden;
  background-color: silver;
  :hover {
    cursor: pointer;
  }
`;
