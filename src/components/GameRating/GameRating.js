import { AiFillStar } from "react-icons/ai";
import "./GameRating.scss";

const Rating = ({ rating, maxRating }) => {
  return (
    <div className="rating">
      <AiFillStar />
      <p className="rating__number">
        {rating} / {maxRating}
      </p>
    </div>
  );
};

export default Rating;
