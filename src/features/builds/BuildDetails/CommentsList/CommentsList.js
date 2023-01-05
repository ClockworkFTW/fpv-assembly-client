// Components
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

// Styles
import * as Styled from "./CommentsList.style";

const CommentsList = ({ comments }) => (
  <div>
    <h2>Leave a comment</h2>
    <CommentForm />
    <h2>Comments</h2>
    <ul>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  </div>
);

export default CommentsList;
