import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";

// Styles
import * as Styled from "features/builds/BuildLog/EmbedElement/EmbedElement.style";

const EmbedElement = ({ attributes, children, element, embed }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const resizeElement = (width) => () => {
    Transforms.setNodes(editor, { width }, { at: path });
  };

  // TODO: remove spacers dynamically
  const removeElement = () => {
    Transforms.removeNodes(editor, { at: path });
  };

  return (
    <Styled.Wrapper
      {...attributes}
      width={element.width}
      contentEditable={false}
    >
      <Styled.Header>
        <div>
          <button onClick={resizeElement("33%")}>1x</button>
          <button onClick={resizeElement("50%")}>2x</button>
          <button onClick={resizeElement("100%")}>3x</button>
        </div>
        <button onClick={removeElement}>remove</button>
      </Styled.Header>
      <Styled.Content>{embed}</Styled.Content>
      {children}
    </Styled.Wrapper>
  );
};

export default EmbedElement;
