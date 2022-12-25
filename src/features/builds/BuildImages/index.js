import styled from "styled-components";

// Components
import Upload from "./Upload";
import Grid from "./Grid";

const BuildImages = ({ images }) => (
  <Container>
    <Upload />
    <Grid images={images} />
  </Container>
);

const Container = styled.div``;

export default BuildImages;
