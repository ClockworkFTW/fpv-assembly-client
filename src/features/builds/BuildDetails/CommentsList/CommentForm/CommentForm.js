import { useState } from "react";
import { useParams } from "react-router-dom";

// API
import {
  useCreateBuildCommentMutation,
  useUpdateBuildCommentMutation,
  useDeleteBuildCommentMutation,
} from "features/builds/buildsApiSlice";

// Hooks
import useAuth from "hooks/useAuth";

// Styles
import * as Styled from "./CommentForm.style";

const CommentsList = ({ commentId, initialMessage, closeForm }) => {
  const user = useAuth();
  const { buildId } = useParams();

  const [message, setMessage] = useState(initialMessage || "");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const [createComment] = useCreateBuildCommentMutation();
  const [updateComment] = useUpdateBuildCommentMutation();
  const [deleteComment] = useDeleteBuildCommentMutation();

  const handleSubmitComment = async () => {
    try {
      if (initialMessage) {
        await updateComment({ buildId, commentId, message });
      } else {
        await createComment({ buildId, message });
      }
      if (closeForm) {
        closeForm();
      } else {
        setMessage("");
      }
    } catch {}
  };

  const handleDeleteComment = () => {
    deleteComment({ buildId, commentId });
  };

  return (
    user && (
      <Styled.Wrapper>
        <Styled.TextBox value={message} onChange={onChange} />
        <button onClick={handleSubmitComment}>submit</button>
        {closeForm && <button onClick={closeForm}>discard</button>}
        {initialMessage && (
          <button onClick={handleDeleteComment}>delete</button>
        )}
      </Styled.Wrapper>
    )
  );
};

export default CommentsList;
