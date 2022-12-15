import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// API
import { useGetBuildQuery } from "../buildsApiSlice";
import { useUpdateUserMutation } from "../../user/userApiSlice";

// Components
import BuildParts from "./BuildParts";

// Hooks
import useAuth from "../../../hooks/useAuth";

// State
import { setActiveBuildId } from "../activeBuildIdSlice";

const PartDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useAuth();

  const { buildId } = useParams();

  const { data: build, isLoading } = useGetBuildQuery(buildId);

  const [updateUser] = useUpdateUserMutation();

  const renderEditButton = (build) => {
    if (user?.id === build.user.id) {
      const onClick = async () => {
        const data = { activeBuildId: build.id };
        await updateUser({ userId: user.id, data });
        dispatch(setActiveBuildId(buildId));
        navigate(`/builds/edit/${build.id}`);
      };

      return <button onClick={onClick}>Edit</button>;
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
