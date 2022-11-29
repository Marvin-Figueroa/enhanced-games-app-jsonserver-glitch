import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import './GameRating.scss';
import PropTypes from 'prop-types';

const Rating = ({ rating = 0, maxRating = 5 }) => {
  return (
    <div className="rating">
      <AiFillStar />
      <p className="rating__number">
        {rating} / {maxRating}
      </p>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  maxRating: PropTypes.number,
};

export default React.memo(Rating);
