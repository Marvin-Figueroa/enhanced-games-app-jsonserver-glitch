import "./GameCard.scss";
import GameRating from "../GameRating/GameRating";

const GameCard = ({ id, name, rating, image, handleGameSelect }) => {
  return (
    <article className="game-card">
      <div className="game-card__image-container">
        <img src={image} alt="" className="game-card__image" />
      </div>
      <div className="game-card__text">
        <h2 className="game-card__title">
          <button onClick={() => handleGameSelect(id)}>{name}</button>
        </h2>
        <GameRating rating={rating} maxRating={5.0} />
      </div>
    </article>
  );
};

export default GameCard;
