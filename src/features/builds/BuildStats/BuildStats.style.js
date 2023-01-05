import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: silver;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
