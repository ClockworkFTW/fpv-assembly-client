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

  const [createCommentVote, { isLoading: isCreateCommentVoteLoading }] =
    useCreateBuildCommentVoteMutation();

  const [updateCommentVote, { isLoading: isUpdateCommentVoteLoading }] =
    useUpdateBuildCommentVoteMutation();

  const [deleteCommentVote, { isLoading: isDeleteCommentVoteLoading }] =
    useDeleteBuildCommentVoteMutation();

  const renderVoteButtons = () => {
    const userVote = comment.votes.find((vote) => vote.userId === user.id);

    const handleVote = (vote) => () => {
      const userId = user.id;
      const commentId = comment.id;

      if (userVote) {
        if (vote === userVote.vote) {
          deleteCommentVote({ buildId, commentId, userId });
        } else {
          updateCommentVote({ buildId, commentId, userId, vote });
        }
      } else {
        createCommentVote({ buildId, commentId, userId, vote });
      }
    };

    const disabled =
      isCreateCommentVoteLoading ||
      isUpdateCommentVoteLoading ||
      isDeleteCommentVoteLoading;

    const upvoteColor = userVote
      ? userVote.vote
        ? "blue"
        : "inherit"
      : "inherit";

    const downvoteColor = userVote
      ? userVote.vote
        ? "inherit"
        : "blue"
      : "inherit";

    const voteCount = comment.votes.reduce(
      (count, { vote }) => (vote ? count + 1 : count - 1),
      0
    );

    return (
      <>
        <Styled.VoteButton
          disabled={disabled}
          color={upvoteColor}
          onClick={handleVote(true)}
        >
          <Icon icon={["fas", "up"]} />
        </Styled.VoteButton>
        {voteCount}
        <Styled.VoteButton
          disabled={disabled}
          color={downvoteColor}
          onClick={handleVote(false)}
        >
          <Icon icon={["fas", "down"]} />
        </Styled.VoteButton>
      </>
    );
  };

  const isBuildCreator = comment.user.id === creatorId;
  const isCommentPoster = user && comment.user.id === user.id;

  const wasEdited = comment.createdAt !== comment.updatedAt;
  const lastUpdate = dayjs(comment.updatedAt).fromNow();

  // Comment replies visibility state
  const [repliesHidden, setRepliesHidden] = useState(depth > 2);

  const toggleRepliesHidden = (e) => {
    e.stopPropagation();
    setRepliesHidden((repliesHidden) => !repliesHidden);
  };

  // Comment form visibility state
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const onEditClicked = () => setIsEditing(true);
  const onReplyClicked = () => setIsReplying(true);

  const closeForm = () => {
    setIsEditing(false);
    setIsReplying(false);
  };

  return (
    <Styled.Wrapper>
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
      {repliesHidden ? (
        <Styled.MoreButton onClick={toggleRepliesHidden}>
          View more replies...
        </Styled.MoreButton>
      ) : (
        <Styled.Container>
          <Styled.ThreadBar onClick={toggleRepliesHidden} />
          <Styled.Message>
            {comment.isDeleted ? "deleted" : comment.message}
          </Styled.Message>
          {user && (
            <Styled.Toolbar>
              {renderVoteButtons()}
              {!isEditing && !isReplying && (
                <>
                  <button onClick={onReplyClicked}>reply</button>
                  {isCommentPoster && (
                    <button onClick={onEditClicked}>edit</button>
                  )}
                </>
              )}
            </Styled.Toolbar>
          )}
          {(isEditing || isReplying) && (
            <CommentForm
              commentId={comment.id}
              initialMessage={isEditing && comment.message}
              closeForm={closeForm}
            />
          )}
          {comment.children.map((child) => (
            <CommentItem key={child.id} comment={child} depth={depth + 1} />
          ))}
        </Styled.Container>
      )}
    </Styled.Wrapper>
  );
};

export default CommentItem;
