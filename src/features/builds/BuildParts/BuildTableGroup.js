import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// API
import {
  useUpdateBuildPartMutation,
  useDeleteBuildPartMutation,
} from "features/builds/buildsApiSlice";

// Components
import Rating from "components/Rating";

// Context
import { BuildIdContext } from "pages/BuildEditor";

// Utilities
import { partTypeToName } from "util";

const BuildTableGroup = ({ partType, parts }) => {
  const buildId = useContext(BuildIdContext);

  const [updateBuildPart, { isLoading: isUpdateLoading }] =
    useUpdateBuildPartMutation();
  const [deleteBuildPart, { isLoading: isDeleteLoading }] =
    useDeleteBuildPartMutation();

  const isLoading = isUpdateLoading || isDeleteLoading;

  const decrementBuildPartQuantity = (part) => {
    if (part.quantity - 1 === 0) {
      deleteBuildPart({ buildId, partId: part.id });
    } else {
      updateBuildPart({
        buildId,
        partId: part.id,
        quantity: part.quantity - 1,
      });
    }
  };

  const incrementBuildPartQuantity = (part) => {
    updateBuildPart({
      buildId,
      partId: part.id,
      quantity: part.quantity + 1,
    });
  };

  const onDeleteBuildPart = (part) => {
    deleteBuildPart({ buildId, partId: part.id });
  };

  return (
    <>
      <Row>
        <Cell>
          <Link to={`/parts/${partType}?page=1`}>
            + {partTypeToName(partType, true)}
          </Link>
        </Cell>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </Row>
      {parts.map((part) => (
        <Row key={part.id}>
          <Cell>
            <button
              disabled={isLoading}
              onClick={() => decrementBuildPartQuantity(part)}
            >
              -
            </button>
            <span>{part.quantity}</span>
            <button
              disabled={isLoading}
              onClick={() => incrementBuildPartQuantity(part)}
            >
              +
            </button>
          </Cell>
          <Cell>
            <Group>
              <Image src={part.image} />
              <Name to={`/parts/${partType}/${part.id}`}>{part.name}</Name>
            </Group>
          </Cell>
          <Cell>
            <Group>
              <Rating rating={part.ratingAverage} /> ({part.ratingCount})
            </Group>
          </Cell>
          <Cell>{part.weight}g</Cell>
          <Cell>
            ${part.currentPrice}{" "}
            <button
              disabled={isLoading}
              onClick={() => onDeleteBuildPart(part)}
            >
              delete
            </button>
          </Cell>
        </Row>
      ))}
    </>
  );
};

const Row = styled.tr``;

const Cell = styled.td`
  padding: 4px 8px;
  border-top: 1px solid silver;
  font-size: 14px;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled(Link)`
  font-weight: 700;
`;

const Image = styled.img`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export default BuildTableGroup;
