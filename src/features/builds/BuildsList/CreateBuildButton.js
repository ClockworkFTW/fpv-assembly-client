import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAuth from "../../auth/useAuth";
import { useCreateBuildMutation } from "../buildsApiSlice";
import { setActiveBuildId } from "../activeBuildIdSlice";

const CreateBuildButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useAuth();

  const [createBuild, { isLoading }] = useCreateBuildMutation();

  const onCreateBuildClicked = async () => {
    try {
      const result = await createBuild();

      const buildId = result.data.build.id;

      dispatch(setActiveBuildId(buildId));
      navigate(`/builds/edit/${buildId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return user ? (
    <button disabled={isLoading} onClick={onCreateBuildClicked}>
      Create Build
    </button>
  ) : null;
};

export default CreateBuildButton;
