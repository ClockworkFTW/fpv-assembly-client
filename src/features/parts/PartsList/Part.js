import { memo } from "react";
import { Link } from "react-router-dom";

import { useGetPartsQuery } from "../partsApiSlice";

const Part = ({ partId, partType }) => {
  const { part } = useGetPartsQuery(partType, {
    selectFromResult: ({ data }) => ({
      part: data?.entities[partId],
    }),
  });

  return part ? (
    <div>
      <Link to={`/parts/${part.type}/${part.id}`}>{part.name}</Link>
    </div>
  ) : null;
};

const memoizedPart = memo(Part);

export default memoizedPart;
