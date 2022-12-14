import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

// API
import { useUpdateUserMutation } from "features/user/userApiSlice";
import {
  useCreateBuildLikeMutation,
  useDeleteBuildLikeMutation,
} from "features/builds/buildsApiSlice";

// Components
import Icon from "components/Icon";
import Counter from "components/Counter";

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

  const [createBuildLike, { isLoading: isCreateLikeLoading }] =
    useCreateBuildLikeMutation();

  const [deleteBuildLike, { isLoading: isDeleteLikeLoading }] =
    useDeleteBuildLikeMutation();

  const renderLikeButton = () => {
    const hasLiked =
      user && build.likes.find((like) => like.userId === user.id);

    const onClick = () => {
      if (hasLiked) {
        deleteBuildLike({ buildId: build.id, likeId: hasLiked.id });
      } else {
        createBuildLike({
          buildId: build.id,
          likeId: uuidv4(),
          userId: user.id,
        });
      }
    };

    const disabled = !user || isCreateLikeLoading || isDeleteLikeLoading;

    return (
      <button disabled={disabled} onClick={onClick}>
        <span>
          <Counter value={build.likes.length} />
        </span>
        <Icon icon={hasLiked ? ["fas", "heart"] : ["far", "heart"]} ml="5px" />
      </button>
    );
  };

  const renderCommentButton = () => {
    const onClick = () => {
      console.log("scroll to comments");
    };

    return (
      <button onClick={onClick}>
        <span>
          <Counter value={build.commentCount} />
        </span>
        <Icon icon={["far", "comment"]} ml="5px" />
      </button>
    );
  };

  const renderViewCount = () => (
    <button>
      <span>
        <Counter value={build.viewCount} />
      </span>
      <Icon icon={["far", "eye"]} ml="5px" />
    </button>
  );

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
      <div>
        {renderEditButton()}
        {renderLikeButton()}
        {renderCommentButton()}
        {renderViewCount()}
      </div>
    </Styled.Container>
  );
};

export default Metadata;
