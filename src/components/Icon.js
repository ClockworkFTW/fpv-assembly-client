import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Icon = ({ icon }) => (
  <Container>
    <FontAwesomeIcon icon={["far", icon]} />
  </Container>
);

const Container = styled.div``;

export default Icon;
