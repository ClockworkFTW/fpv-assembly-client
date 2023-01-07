import { useContext, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// API
import {
  useCreateBuildCommentVoteMutation,
  useUpdateBuildCommentVoteMutation,
  useDeleteBuildCommentVoteMutation,
} from "features/builds/buildsApiSlice";

// Components
import Avatar from "components/Avatar";
import Icon from "components/Icon";
import CommentForm from "../CommentForm";

// Context
import { BuildContext } from "pages/BuildDetails/BuildDetails";

// Hooks
import useAuth from "hooks/useAuth";

// Styles
import * as Styled from "./CommentItem.style";

dayjs.extend(relativeTime);

const CommentItem = ({ comment, depth = 0 }) => {
  const user = useAuth();
  const { buildId, creatorId } = useContext(BuildContext);

  const [createCommentVote] = useCreateBuildCommentVoteMutation();
  const [updateCommentVote] = useUpdateBuildCommentVoteMutation();
  const [deleteCommentVote] = useDeleteBuildCommentVoteMutation();

  const userVote =
    user && comment.votes.find((vote) => vote.userId === user.id);

  const handleVote = (vote) => () => {
    const commentId = comment.id;
    if (userVote) {
      if (vote === userVote.vote) {
        deleteCommentVote({ buildId, commentId });
      } else {
        updateCommentVote({ buildId, commentId, vote });
      }
    } else {
      createCommentVote({ buildId, commentId, vote });
    }
  };

  const isBuildCreator = comment.user.id === creatorId;
  const isCommentPoster = user && comment.user.id === user.id;

  const wasEdited = comment.createdAt !== comment.updatedAt;
  const lastUpdate = dayjs(comment.updatedAt).fromNow();

  const voteCount = comment.votes.reduce(
    (count, { vote }) => (vote ? count + 1 : count - 1),
    0
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const onEditClicked = () => setIsEditing(true);
  const onReplyClicked = () => setIsReplying(true);

  const closeForm = () => {
    setIsEditing(false);
    setIsReplying(false);
  };

  return (
    <>
      <Styled.CommentWrapper>
        <Styled.UserDetails>
          <Avatar user={comment.user} mr="10px" />
          <div>
            <Styled.Username>
              {comment.user.username} {isBuildCreator && "(creator)"}
            </Styled.Username>
            <Styled.LastUpdate>
              {lastUpdate} {wasEdited && "(edited)"}
            </Styled.LastUpdate>
          </div>
        </Styled.UserDetails>
        <Styled.CommentMessage>
          <p>{comment.isDeleted ? "deleted" : comment.message}</p>
        </Styled.CommentMessage>
        {user && (
          <div>
            <Styled.VoteButton
              color={
                userVote ? (userVote.vote ? "blue" : "inherit") : "inherit"
              }
              onClick={handleVote(true)}
            >
              <Icon icon={["fas", "up"]} />
            </Styled.VoteButton>
            {voteCount}
            <Styled.VoteButton
              color={
                userVote ? (userVote.vote ? "inherit" : "blue") : "inherit"
              }
              onClick={handleVote(false)}
            >
              <Icon icon={["fas", "down"]} />
            </Styled.VoteButton>
            {!isEditing && !isReplying && (
              <>
                <button onClick={onReplyClicked}>reply</button>
                {isCommentPoster && (
                  <button onClick={onEditClicked}>edit</button>
                )}
              </>
            )}
          </div>
        )}
        {(isEditing || isReplying) && (
          <CommentForm
            commentId={comment.id}
            initialMessage={isEditing && comment.message}
            closeForm={closeForm}
          />
        )}
      </Styled.CommentWrapper>
      {comment.children.map((child) => (
        <Styled.CommentThread>
          <CommentItem comment={child} depth={depth + 1} />
        </Styled.CommentThread>
      ))}
    </>
  );
};

export default CommentItem;
