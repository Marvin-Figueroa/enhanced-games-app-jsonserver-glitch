import GameCard from '../GameCard/GameCard';
import './GameCardsGrid.scss';
import PropTypes, { object } from 'prop-types';

const GameCardsGrid = ({ games, handleGameSelect }) => {
  return (
    <section className='games-container'>
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          handleGameSelect={handleGameSelect}
        />
      ))}
    </section>
  );
};

GameCardsGrid.propTypes = {
  games: PropTypes.arrayOf(object).isRequired,
  handleGameSelect: PropTypes.func.isRequired,
};

export default GameCardsGrid;
