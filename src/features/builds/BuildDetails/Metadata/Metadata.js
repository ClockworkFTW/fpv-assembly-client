import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// API
import { useUpdateUserMutation } from "features/user/userApiSlice";

// Hooks
import useAuth from "hooks/useAuth";

// State
import { setActiveBuildId } from "features/builds/activeBuildIdSlice";

// Styles
import * as Styled from "features/builds/BuildDetails/Metadata/Metadata.style";

const Metadata = ({ build }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useAuth();

  const [updateUser] = useUpdateUserMutation();

  const renderEditButton = () => {
    if (user?.id === build.user.id) {
      const onClick = async () => {
        const data = { activeBuildId: build.id };
        await updateUser({ userId: user.id, data });
        dispatch(setActiveBuildId(build.id));
        navigate(`/builds/edit/${build.id}`);
      };

      return <button onClick={onClick}>Edit</button>;
    }
  };

  return (
    <Styled.Container>
      <div>
        <h1>{build.name}</h1>
        <p>
          Built by{" "}
          <Link to={`/profile/${build.user.id}`}>{build.user.username}</Link> on{" "}
          {dayjs(build.createdAt).format("MMM D, YYYY")}
        </p>
      </div>
      <div>{renderEditButton()}</div>
    </Styled.Container>
  );
};

export default Metadata;
