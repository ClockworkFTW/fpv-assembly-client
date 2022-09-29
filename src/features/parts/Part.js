import { memo } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useGetPartsQuery } from "./partsApiSlice";

const Part = ({ partId, partType }) => {
  const navigate = useNavigate();

  const { part } = useGetPartsQuery(partType, {
    selectFromResult: ({ data }) => ({
      part: data?.entities[partId],
    }),
  });

  return part ? (
    <div>
      <Link to={`/parts/${part.type}/${part.id}`}>{part.name}</Link>
      <button onClick={() => navigate(`/parts/edit/${partId}`)}>edit</button>
    </div>
  ) : null;
};

const memoizedPart = memo(Part);

export default memoizedPart;
