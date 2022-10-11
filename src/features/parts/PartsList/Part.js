import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useAuth from "../../auth/useAuth";
import { useGetPartsQuery } from "../partsApiSlice";
import { useCreateBuildPartMutation } from "../../builds/buildsApiSlice";

const Part = ({ partId, partType }) => {
  const user = useAuth();

  const activeBuildId = useSelector((state) => state.activeBuildId);

  const { part } = useGetPartsQuery(partType, {
    selectFromResult: ({ data }) => ({
      part: data?.entities[partId],
    }),
  });

  const [addPart] = useCreateBuildPartMutation();

  const renderAddPartButton = (partId) => {
    const onClick = () => addPart({ buildId: activeBuildId, partId });

    if (user && activeBuildId) {
      return <button onClick={onClick}>Add Part</button>;
    }
  };

  return part ? (
    <div>
      {renderAddPartButton(partId)}
      <Link to={`/parts/${part.type}/${part.id}`}>{part.name}</Link>
    </div>
  ) : null;
};

const memoizedPart = memo(Part);

export default memoizedPart;
