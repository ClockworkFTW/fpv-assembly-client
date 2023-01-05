import styled from "styled-components";

export const CommentWrapper = styled.li`
  margin-bottom: 20px;
`;

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const Username = styled.p`
  font-size: 14px;
  font-weight: 700;
`;

export const LastUpdate = styled.p`
  font-size: 14px;
`;

export const CommentMessage = styled.div`
  margin: 10px 0;
`;

export const VoteButton = styled.button`
  color: ${({ color }) => color};
`;
