import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import styled from "styled-components";

// Components
import Image from "components/Image";

export const ImageModal = ({ images, modal, closeModal }) => {
  const editor = useSlateStatic();

  const insertImage = (url) => {
    const video = { type: "image", url, children: [{ text: "" }] };
    const space = { type: "paragraph", children: [{ text: "" }] };
    Transforms.insertNodes(editor, video);
    Transforms.insertNodes(editor, space);
    closeModal();
  };

  if (modal !== "image") return null;

  return images.length ? (
    <ImageModalGrid>
      {images.map((image) => (
        <ImageModalItem key={image.id} onClick={() => insertImage(image.url)}>
          <img
            alt={image.id}
            src={image.url}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </ImageModalItem>
      ))}
    </ImageModalGrid>
  ) : (
    "No build images"
  );
};

const ImageModalGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
`;

const ImageModalItem = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 4px;
  overflow: hidden;
  background-color: silver;
  :hover {
    cursor: pointer;
  }
`;

export const ImageElement = ({ children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const removeElement = (e) => {
    e.preventDefault();
    Transforms.removeNodes(editor, { at: path });
  };

  return (
    <ImageElementWrapper contentEditable={false}>
      <ImageElementHeader>
        <button onClick={removeElement}>remove</button>
      </ImageElementHeader>
      <ImageElementContainer>
        <Image alt="build image" url={element.url} />
      </ImageElementContainer>
      {children}
    </ImageElementWrapper>
  );
};

const ImageElementWrapper = styled.div`
  display: inline-block;
  width: 33%;
  padding: 10px;
  border-radius: 4px;
  background-color: silver;
`;

const ImageElementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 10px;
`;

const ImageElementContainer = styled.div`
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
`;
