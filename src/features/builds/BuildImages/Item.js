import { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

// Components
import Image from "components/Image";

const Item = memo((props) => {
  const { id, index, url, scrollPosition } = props;
  const { findItem, moveItem, deleteItem, reorderItems } = props;

  const originalIndex = findItem(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "image",
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        if (!monitor.didDrop()) {
          moveItem(droppedId, originalIndex);
        } else {
          reorderItems();
        }
      },
    }),
    [id, originalIndex, moveItem]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "image",
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findItem(id);
          moveItem(draggedId, overIndex);
        }
      },
    }),
    [findItem, moveItem]
  );

  return (
    <Container
      ref={(node) => drag(drop(node))}
      opacity={isDragging ? 0 : 1}
      onClick={() => deleteItem(id)}
    >
      <Image alt={id} url={url} scrollPosition={scrollPosition} />
      <Order>{index + 1}</Order>
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 4px;
  overflow: hidden;
  background-color: silver;
  opacity: ${({ opacity }) => opacity};
  transform: translate(0, 0);
  :hover {
    cursor: pointer;
  }
`;

const Order = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
`;

export default Item;
