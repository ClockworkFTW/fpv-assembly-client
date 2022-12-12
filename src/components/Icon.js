import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Icon = ({ icon, ...props }) => (
  <Container {...props}>
    <FontAwesomeIcon icon={icon} />
  </Container>
);

const Container = styled.div`
  margin-right: ${({ mr }) => mr};
  margin-left: ${({ ml }) => ml};
  color: ${({ color }) => color};
`;

export default Icon;
