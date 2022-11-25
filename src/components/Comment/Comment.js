import './Comment.scss';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => {
  return (
    <div className='comment'>
      <span className='comment__user'>{comment.user}</span>
      <p className='comment__text'>{comment.comment}</p>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
