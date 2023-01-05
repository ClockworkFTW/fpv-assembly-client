import { Link } from "react-router-dom";
import styled from "styled-components";

const Avatar = ({ user, mr, ml }) => {
  const placeholder = `https://ui-avatars.com/api/?name=${user.username}&background=e74c3c&color=fff&bold=true`;
  return (
    <Wrapper to={`/profile/${user.id}`} mr={mr} ml={ml}>
      <Image src={user.avatar || placeholder} />
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: ${({ mr }) => mr};
  margin-left: ${({ ml }) => ml};
  border-radius: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Avatar;
