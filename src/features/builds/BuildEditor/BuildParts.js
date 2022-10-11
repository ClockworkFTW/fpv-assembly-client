import {
  useUpdateBuildPartMutation,
  useDeleteBuildPartMutation,
} from "../buildsApiSlice";

const BuildParts = ({ buildId, parts }) => {
  const sortedParts = parts.slice();
  sortedParts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <ul>
      {sortedParts.map((part) => (
        <BuildPart key={part.id} buildId={buildId} part={part} />
      ))}
    </ul>
  );
};

const BuildPart = ({ buildId, part }) => {
  const [updateBuildPart, { isLoading: isUpdateLoading }] =
    useUpdateBuildPartMutation();
  const [deleteBuildPart, { isLoading: isDeleteLoading }] =
    useDeleteBuildPartMutation();

  const onUpdateBuildPartClicked = (amount) => {
    updateBuildPart({
      buildId,
      partId: part.id,
      quantity: part.quantity + amount,
    });
  };

  const onDeleteBuildPartClicked = () => {
    deleteBuildPart({ buildId, partId: part.id });
  };

  return (
    <li>
      <span>
        <button
          disabled={part.quantity === 1 || isUpdateLoading}
          onClick={() => onUpdateBuildPartClicked(-1)}
        >
          -
        </button>
        <span>{part.quantity}</span>
        <button
          disabled={isUpdateLoading}
          onClick={() => onUpdateBuildPartClicked(1)}
        >
          +
        </button>
      </span>
      <span>
        - {part.type} - ${part.price} - {part.name}
      </span>
      <button disabled={isDeleteLoading} onClick={onDeleteBuildPartClicked}>
        delete
      </button>
    </li>
  );
};

export default BuildParts;
