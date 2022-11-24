import Comment from "../Comment/Comment";
import "./CommentsList.scss";

const CommentsList = ({ comments, users }) => {
  const populatedComments = getCommentsWithUser();

  function getCommentsWithUser() {
    const populatedCommentsUser = comments.map((comment) => {
      const userObj = users.find((user) => user.id === comment.user);
      return {
        ...comment,
        user: `${userObj?.name} ${userObj?.lastName}`,
      };
    });

    return populatedCommentsUser;
  }

  return (
    <div className="comments">
      <p className="comments_label">
        All comments ({populatedComments?.length})
      </p>
      <div className="comments__container">
        {populatedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
