import styled from "styled-components/macro";

export const Wrapper = styled.ul`
  margin: 10px 0;
`;

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 10px;
`;

export const MoreButton = styled.p`
  :hover {
    cursor: pointer;
    color: blue;
  }
`;

export const Container = styled.div`
  position: relative;
  margin-left: 14px;
  padding-left: 26px;
`;

export const ThreadBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 2px;
  background-color: silver;
  :hover {
    cursor: pointer;
    background-color: blue;
  }
`;

export const Username = styled.p`
  font-size: 14px;
  font-weight: 700;
`;

export const LastUpdate = styled.p`
  font-size: 14px;
`;

export const Message = styled.p``;

export const Toolbar = styled.div`
  margin-top: 10px;
`;

export const VoteButton = styled.button`
  color: ${({ color }) => color};
`;
