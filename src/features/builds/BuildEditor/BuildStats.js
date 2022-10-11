import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useGetBuildQuery } from "../buildsApiSlice";

const BuildStats = () => {
  const activeBuildId = useSelector((state) => state.activeBuildId);

  const { data: build } = useGetBuildQuery(activeBuildId, {
    skip: !activeBuildId,
  });

  const renderCount = (parts) => {
    return parts.reduce((c, part) => c + part.quantity, 0);
  };

  const renderTotal = (parts) => {
    return parts.reduce((t, part) => t + part.price * part.quantity, 0);
  };

  const renderWeight = (parts) => {
    return parts.reduce((w, part) => w + part.weight * part.quantity, 0);
  };

  return build ? (
    <div>
      <Link to={`/builds/edit/${build.id}`}>
        <h3>{build.name}</h3>
      </Link>
      <ul>
        <li>Parts: {renderCount(build.parts)}</li>
        <li>Total: ${renderTotal(build.parts)}</li>
        <li>Weight: {renderWeight(build.parts)}g</li>
      </ul>
    </div>
  ) : null;
};

export default BuildStats;
