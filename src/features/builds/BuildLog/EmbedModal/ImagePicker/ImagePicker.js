// Components
import Image from "components/Image";

// Styles
import * as Styled from "features/builds/BuildLog/EmbedModal/ImagePicker/ImagePicker.style";

const ImagePicker = ({ modal, embedElement, images }) => {
  if (modal !== "image") return null;

  return images.length ? (
    <Styled.Grid>
      {images.map(({ id, url }) => (
        <Styled.Item key={id} onClick={embedElement("image", url)}>
          <Image url={url} />
        </Styled.Item>
      ))}
    </Styled.Grid>
  ) : (
    "No build images"
  );
};

export default ImagePicker;
