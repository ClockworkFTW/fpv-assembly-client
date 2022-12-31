import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

// Components
import Icon from "components/Icon";

// Hooks
import useDisableScroll from "hooks/useDisableScroll";

// Styles
import * as Styled from "./EmbedModal.style";

// Utilities
import { addPropsToChildren } from "util";

const EmbedModal = ({ children, modal, closeModal }) => {
  const editor = useSlateStatic();

  // TODO: make spacer insert dynamic
  const embedElement = (type, url) => () => {
    const children = [{ text: "" }];
    const element = { children, type, url, width: "33%" };
    const space = { children, type: "paragraph" };
    Transforms.insertNodes(editor, element);
    Transforms.insertNodes(editor, space);
    closeModal();
  };

  useDisableScroll(modal);

  return (
    modal && (
      <Styled.Wrapper>
        <Styled.Container>
          <Styled.Header>
            <h2>Select your {modal}</h2>
            <button onClick={closeModal}>close</button>
          </Styled.Header>
          <Styled.Content>
            {addPropsToChildren(children, { modal, embedElement })}
          </Styled.Content>
        </Styled.Container>
      </Styled.Wrapper>
    )
  );
};

export const ModalButton = ({ openModal, icon }) => (
  <Styled.Button onMouseDown={openModal}>
    <Icon icon={["fas", icon]} />
  </Styled.Button>
);

export default EmbedModal;
