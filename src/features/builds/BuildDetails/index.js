import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import useAuth from "../../auth/useAuth";
import { useGetBuildQuery } from "../buildsApiSlice";
import { setActiveBuildId } from "../activeBuildIdSlice";

import BuildParts from "./BuildParts";

const PartDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useAuth();

  const { buildId } = useParams();

  const { data: build, isLoading } = useGetBuildQuery(buildId);

  const renderEditButton = (build) => {
    if (user?.id === build.user.id) {
      const onClick = () => {
        dispatch(setActiveBuildId(build.id));
        navigate(`/builds/edit/${build.id}`);
      };

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
      <BuildParts parts={build.parts} />
    </div>
  ) : (
    <p>Build not found...</p>
  );
};

export default PartDetails;
