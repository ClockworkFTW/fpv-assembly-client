import styled from "styled-components";

// Components
import Tooltip from "components/Tooltip";
import Upload from "features/builds/BuildImages/Upload";
import Grid from "features/builds/BuildImages/Grid";

const BuildImages = ({ images }) => (
  <Container>
    <Banner>
      <Upload />
      <Tooltip
        id="build-images"
        content="Drag and drop images to rearrange their order. Click an image to delete it."
      />
    </Banner>

    <Grid images={images} />
  </Container>
);

const Container = styled.div``;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default BuildImages;
