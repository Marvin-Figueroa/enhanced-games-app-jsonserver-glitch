import { AiFillStar } from 'react-icons/ai';
import './GameRating.scss';
import PropTypes from 'prop-types';

const Rating = ({ rating, maxRating = 5 }) => {
  return (
    <div className='rating'>
      <AiFillStar />
      <p className='rating__number'>
        {rating} / {maxRating}
      </p>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number,
};

export default Rating;
