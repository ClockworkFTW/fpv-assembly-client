import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Icon = ({ icon, ...props }) => (
  <Container icon={icon} {...props} />
);

const Container = styled(FontAwesomeIcon)`
  margin-right: ${({ mr }) => mr};
  margin-left: ${({ ml }) => ml};
  color: ${({ color }) => color};
`;

export default Icon;
