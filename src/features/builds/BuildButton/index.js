import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// API
import { useCreateBuildMutation } from "features/builds/buildsApiSlice";

// Hooks
import useAuth from "hooks/useAuth";

// Redux
import { setActiveBuildId } from "features/builds/activeBuildIdSlice";

const BuildButton = () => {
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
    <Button disabled={isLoading} onClick={onCreateBuildClicked}>
      +
    </Button>
  ) : null;
};

const Button = styled.button``;

export default BuildButton;
