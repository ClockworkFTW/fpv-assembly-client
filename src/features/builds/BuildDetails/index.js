import { useParams, useNavigate } from "react-router-dom";

import useAuth from "../../auth/useAuth";
import { useGetBuildQuery } from "../buildsApiSlice";

const PartDetails = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const { buildId } = useParams();

  const { data: build, isLoading } = useGetBuildQuery(buildId);

  const renderEditButton = (build) => {
    if (user?.id === build.user.id) {
      const onClick = () => navigate(`/builds/edit/${build.id}`);
      return <button onClick={onClick}>edit</button>;
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : build ? (
    <div>
      {renderEditButton(build)}
      <h1>{build.name}</h1>
      <p>{build.markdown}</p>
    </div>
  ) : (
    <p>Build not found...</p>
  );
};

export default PartDetails;
