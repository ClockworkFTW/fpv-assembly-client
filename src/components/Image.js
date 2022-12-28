import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";

const Image = ({ alt, url, scrollPosition }) => (
  <Container
    alt={alt}
    src={url}
    width="100%"
    height="100%"
    effect="opacity"
    scrollPosition={scrollPosition}
    wrapperProps={{
      style: { display: "block", width: "100%", height: "100%" },
    }}
  />
);

const Container = styled(LazyLoadImage)`
  object-fit: cover;
`;

export default Image;
