import './GameCard.scss';
import GameRating from '../GameRating/GameRating';
import PropTypes from 'prop-types';

const GameCard = ({ game, handleGameSelect }) => {
  return (
    <article className='game-card'>
      <div className='game-card__image-container'>
        <img src={game.background_image} alt='' className='game-card__image' />
      </div>
      <div className='game-card__text'>
        <h2 className='game-card__title'>
          <button onClick={() => handleGameSelect(game.id)}>{game.name}</button>
        </h2>
        <GameRating rating={game.rating} maxRating={5.0} />
      </div>
    </article>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    background_image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  handleGameSelect: PropTypes.func.isRequired,
};

export default GameCard;
