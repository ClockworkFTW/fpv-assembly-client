import { memo } from "react";
import { Link } from "react-router-dom";

import { useGetBuildsQuery } from "../buildsApiSlice";

const Build = ({ buildId }) => {
  const { build } = useGetBuildsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      build: data?.entities[buildId],
    }),
  });

  return build ? (
    <div>
      <Link to={`/builds/${build.id}`}>{build.name}</Link>
    </div>
  ) : null;
};

const memoizedPart = memo(Build);

export default memoizedPart;
