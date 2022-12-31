import styled from "styled-components";

export const Wrapper = styled.div`
  display: inline-block;
  width: ${({ width }) => width};
  padding: 10px;
  border-radius: 4px;
  background-color: silver;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 10px;
`;

export const Content = styled.div`
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
`;
