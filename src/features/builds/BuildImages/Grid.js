import { useCallback, useContext, useEffect, useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import styled from "styled-components";

// API
import {
  useReorderBuildImagesMutation,
  useDeleteBuildImageMutation,
} from "features/builds/buildsApiSlice";

// Components
import Item from "features/builds/BuildImages/Item";

// Context
import { BuildIdContext } from "pages/BuildEditor";

const Grid = ({ images }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([...images].sort((imageA, imageB) => imageA.index - imageB.index));
  }, [images]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Items items={items} setItems={setItems} />
    </DndProvider>
  );
};

const Items = ({ items, setItems, scrollPosition }) => {
  const buildId = useContext(BuildIdContext);

  const [reorderBuildImages, { isLoading: isReorderLoading }] =
    useReorderBuildImagesMutation();
  const [deleteBuildImage, { isLoading: isDeleteLoading }] =
    useDeleteBuildImageMutation();

  const findItem = useCallback(
    (id) => {
      const item = items.find((item) => item.id === id);
      const index = items.indexOf(item);
      return { item, index };
    },
    [items]
  );

  const moveItem = useCallback(
    (id, atIndex) => {
      const { item, index } = findItem(id);
      const test = update(items, {
        $splice: [
          [index, 1],
          [atIndex, 0, item],
        ],
      });
      setItems(test.map((e, i) => ({ ...e, index: i })));
    },
    [items, setItems, findItem]
  );

  const reorderItems = useCallback(() => {
    if (isReorderLoading) return;
    reorderBuildImages({ buildId, images: items });
  }, [buildId, items, reorderBuildImages, isReorderLoading]);

  const deleteItem = useCallback(
    (imageId) => {
      if (isDeleteLoading) return;
      const { index } = findItem(imageId);
      const test = update(items, { $splice: [[index, 1]] });
      setItems(test.map((e, i) => ({ ...e, index: i })));
      deleteBuildImage({ buildId, imageId });
    },
    [buildId, items, setItems, findItem, deleteBuildImage, isDeleteLoading]
  );

  const [, drop] = useDrop(() => ({ accept: "image" }));

  const isLoading = isReorderLoading || isDeleteLoading;

  return (
    <Container ref={drop}>
      {items.map((item) => (
        <Item
          key={item.id}
          {...item}
          findItem={findItem}
          moveItem={moveItem}
          deleteItem={deleteItem}
          reorderItems={reorderItems}
          scrollPosition={scrollPosition}
        />
      ))}
      {isLoading && <Overlay />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
`;

export default Grid;
