import { LazyLoadImage } from "react-lazy-load-image-component";

const wrapperProps = {
  style: { display: "block", width: "100%", height: "100%" },
};

const Image = ({ alt, url }) => (
  <LazyLoadImage
    alt={alt}
    src={url}
    width="100%"
    height="100%"
    effect="opacity"
    style={{ objectFit: "cover" }}
    wrapperProps={wrapperProps}
  />
);

export default Image;
