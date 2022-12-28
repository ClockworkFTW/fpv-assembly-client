import styled from "styled-components";

// Components
import Icon from "components/Icon";

// Hooks
import useDisableScroll from "hooks/useDisableScroll";

// Utilities
import { addPropsToChildren } from "util";

const Modal = ({ children, modal, closeModal }) => {
  useDisableScroll(modal);

  return modal ? (
    <Wrapper>
      <Container>
        <Header>
          <h2>Select your {modal}</h2>
          <button onClick={closeModal}>close</button>
        </Header>
        <Content>{addPropsToChildren(children, { modal, closeModal })}</Content>
      </Container>
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
  max-width: 50%;
  min-width: 500px;
  max-height: 70%;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const Content = styled.div`
  height: 100%;
  overflow-y: scroll;
  border-radius: 4px;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
`;

export const ModalButton = ({ openModal, icon }) => {
  const onMouseDown = (event) => {
    event.preventDefault();
    openModal();
  };

  return (
    <Button onMouseDown={onMouseDown}>
      <Icon icon={["fas", icon]} />
    </Button>
  );
};

const Button = styled.div`
  display: inline-block;
  padding: 6px;
  color: ${({ isActive }) => (isActive ? "red" : "silver")};
  :hover {
    cursor: pointer;
    color: ${({ isActive }) => (isActive ? "red" : "black")};
  }
`;

export default Modal;
